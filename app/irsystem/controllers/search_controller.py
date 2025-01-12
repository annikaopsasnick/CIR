from . import *  
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
from app.irsystem.controllers.jaccard import *
from app.irsystem.controllers.filters import *
from app.irsystem.controllers.jaccard_helper import custom_dict, compute_edit_distance, clean_query
import json

project_name = "Liver Let Die - Personalized Cocktail Recommendations"
net_id = "Annika Opsasnick (aro42), Callie Aboaf (cha46), Kaysie Yu (ky276), Simran Puri (sp2262), Yunyun Wang (yw458)"

	
@irsystem.route('/', methods=['GET'])
# function that generates everything on index.html
def search():
	return render_template('index.html', name=project_name, netid=net_id)

@irsystem.route('/query', methods=['POST'])
def queryendpoint():
	# import pdb; pdb.set_trace()
  inputs = request.get_json()

  print("here on backend",inputs)
	
  query = inputs['query_string']
  temp_pref = inputs['temp']
  spirit = inputs['base_spirit']
  season = inputs['season']
  if 'easy' in inputs:
    easy = inputs['easy']
  else:
    easy = False

  tagsNo = inputs['tagsNo']
  tagsYes = inputs['tagsYes']

  sort_pref = inputs['sortby']

  print("filters:", temp_pref, spirit, season, sort_pref, easy, tagsNo, tagsYes)

  iced_filter = False
  hot_filter = False
  sort_filter = False
  if temp_pref == "iced":
    iced_filter = True
  if temp_pref == "hot":
    hot_filter = True
  if sort_pref == "rating":
    sort_filter = True

  # if search terms
  if (len(query)):
    # if only search terms
    if (not iced_filter and not hot_filter and not sort_filter and spirit == "nopref" and season == "nopref" and tagsNo == [] and tagsYes == [] and easy == False):
      print("no filters")
      ranked = jaccard(query, tokenized_df.copy(), sim_feature_weights, [i for i in range(n_cocktails)],  treebank_tokenizer) # [score_drink0, score_drink1,]
    # if both search terms and filters
    else:
      ranked = filters(query, sm_df, iced_filter, hot_filter, spirit, season, easy, tagsNo, tagsYes, )

  # no search terms
  else:
    print("no search")
    ranked = filters(query, sm_df, iced_filter, hot_filter, spirit, season, easy, tagsNo, tagsYes, ) # [score_drink0, score_drink1,]

  top_cocktails= top_scores(ranked) # [{name:"", ingredients:"[]", description:"",..},]
  
  print("old string form")
  print(type(top_cocktails))

  top_json = json.loads(top_cocktails)

  # print(top_json)
 
  #conditional statements for form inputs 
  if (sort_pref == "rating"):
  
    top_10 = sorted(top_json, key = lambda x: x['rating'], reverse = True) #sort by social rating field 

    print("ratings")
    print([cocktail['rating'] for cocktail in top_10])
    # print(top_10)
    
    #return back to string 
    top_cocktails = json.dumps(top_10)

    print("new string form")
    print(type(top_cocktails))
    print(top_cocktails)


  # if no cocktails match search find suggested terms
  search_suggestions = {}
 
  if (len(query) > 0 and (top_cocktails=="[]")):
    print("here at search suggestions")
    query_tokens = clean_query(query, treebank_tokenizer)
    search_suggestions = compute_edit_distance(custom_dict, query_tokens)
    print(search_suggestions)

  

  # jaccard_sim = jaccard(query, tokenized_df.copy(), sim_feature_weights,[i for i in range(n_cocktails)], treebank_tokenizer)
  # top_cocktails = top_scores(jaccard_sim) 

  return {
    'query_string': query,
    'cocktails': top_cocktails,
    'search_suggestions': search_suggestions,
  }






  """
  test_cocktail_results = [{"base_spirits":["gin"],"name":"50-50 martini","url":"https://www.thespruceeats.com/50-50-gin-martini-recipe-759550","name_words":["50-50","martini"],"description":"The 50-50 martini is the mix for those who embrace vermouth. It's a twist on the classic gin martini that simply changes up the ratio of the two ingredients. If you enjoy vermouth, you'll find this a nice change of pace and a far cry from the modern custom of using virtually no vermouth. Use the best gin and vermouth you can get for this cocktail and add a dash of bitters for a little extra spark. Likewise, many of the standard martini options will also work here. For instance, shake it if you prefer or pour vodka. You might also enjoy it served with a lemon twist rather than the olive. As long as the ingredient ratio is 1:1, it technically qualifies as a 50-50 martini!","image":"https://www.thespruceeats.com/thmb/PNxhU3pehj-aeBopfixw4ML_PxQ=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/5050Martini-477307201-56a170623df78cf7726aa7eb.jpg","ingredients":["2 ounces gin","2 ounces dry vermouth","Garnish: olive"]},{"base_spirits":["gin"],"name":"abbey cocktail","url":"https://www.thespruceeats.com/abbey-cocktail-recipe-759566","name_words":["abbey","cocktail"],"description":"The Abbey Cocktail makes an excellent brunch cocktail and is the more sophisticated version of an Orange Blossom. It's a very simple drink to make but the orange bitters add a slight kick to the drink, which you can tailor to your taste. Regan's Orange Bitters No. 6 is the perfect combination with your favorite premium gin. For the juice, fresh is always better.","image":"https://www.thespruceeats.com/thmb/gc7MpJ85PeA8RnCesCCvytAAzic=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/WillRogersCocktail-498373867-56a1741b3df78cf7726ac651.jpg","ingredients":["2 ounces gin","1 1/2 ounces orange juice","2 dashes orange bitters","Garnish: maraschino cherry"]},{"base_spirits":["absinthe"],"name":"absinthe cocktail","url":"https://www.thespruceeats.com/absinthe-cocktail-recipe-759567","name_words":["absinthe","cocktail"],"description":"This absinthe cocktail is truly a classic cocktail. It can be found in many of the first bartending books including those by \"The Professor\" Jerry Thomas. This recipe has been adapted--with only minor changes necessary for today's bar--from the 1887 printing of Thomas' \"Bartenders Guide.\" If you're looking for an old-school drink that really shows off the true flavor of absinthe, it's the recipe you need! The absinthe cocktail is one of the purest ways to enjoy the notorious anise-flavored liquor that was banned through much of the world for a good portion of the 20th century. This recipe is very similar in taste and effect as the traditional method of drinking absinthe, which uses a sugar cube and absinthe spoon. In an interesting twist, bartenders of Thomas' time must have thought that absinthe wasn't enough anise for this drink. The recipe doubles up on that distinct flavor--reminiscent of black licorice--by adding a couple dashes of anisette. It should go without saying, then, that if you are going to try this drink, you really, really need to enjoy the taste of anise!","image":"https://www.thespruceeats.com/thmb/dkkcc3vR008Z-lYhw2vEDgYYSyE=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Absinthe-Cocktail-56a172985f9b58b7d0bf5f24.jpg","ingredients":["1 ounce absinthe","1 ounce ice water (cold)","2 dashes anisette","2 dashes Angostura Bitters"]},{"base_spirits":["vodka"],"name":"accomplice","url":"https://www.thespruceeats.com/stoli-accomplice-recipe-760988","name_words":["accomplice"],"description":"Combine a fine Champagne and a great vodka with strawberries and you have a fantastic drink called the Stoli accomplice. This is a great cocktail for elite celebrations and, especially, New Year's Eve parties. The elegant strawberry cocktail recipe comes from Stolichnaya Vodka (aka Stoli), which is a crisp, clean Russian vodka that's perfect for high-end cocktails like this. It's also nice that it's served in a cocktail glass as opposed to a Champagne flute because the wider glass allows the bubbles to swell. For the perfect finishing touch, don't forget to rim your glass before straining the drink. The sugar's sweetness is fantastic against a  brut or extra brut wine, creating a sweet-dry combination that is quite stunning.","image":"https://www.thespruceeats.com/thmb/kE1PT0zTpWwl_nvHQvA6iqpY4T4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-587105097-581ca9133df78cc2e87abbf5.jpg","ingredients":["3 strawberries (sliced)","1/2 ounce simple syrup","2 ounces vodka (Stolichnaya)","1/2 ounce lemon juice (fresh)","1 ounce Champagne (or enough to fill)","Garnish: superfine sugar for the rim"]},{"base_spirits":["sherry"],"name":"adonis","url":"https://www.thespruceeats.com/adonis-cocktail-recipe-759276","name_words":["adonis"],"description":"The Adonis is one of the classic cocktails that makes an excellent aperitif. It's an easy drink to remember, just think of a Perfect Martini with sherry instead of gin. The cocktail is named after what is called the first Broadway musical. Adonis opened in 1884 at New York's Bijou, ran for over 600 performances, and starred Henry E. Dixey.","image":"https://www.thespruceeats.com/thmb/oLTEMIFagTc8iW4HCekbfw9W80M=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/adonis-cocktail-56a170405f9b58b7d0bf4aba.jpg","ingredients":["1-ounce dry sherry","1/2 ounce sweet vermouth","1/2 ounce dry vermouth","2 dashes orange bitters"]}]
  """
	

