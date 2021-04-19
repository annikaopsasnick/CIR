from . import *  
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
from app.irsystem.controllers.jaccard import *

project_name = "Liver Let Die - Personalized Cocktail Recommendations"
net_id = "Annika Opsasnick (aro42), Callie Aboaf (cha46), Kaysie Yu (ky276), Simran Puri (sp2262), Yunyun Wang (yw458)"

@irsystem.route('/', methods=['GET'])

# function that generates everything on search.html
def search():
  query = request.args.get('search')

  temp_pref = request.args.get('temp')
  print(temp_pref)
  # hot = request.args.get('hot')
  # nopref = request.args.get('nopref')

  iced_filter = False
  hot_filter = False
  if temp_pref == "iced":
    iced_filter = True
  if temp_pref == "hot":
    hot_filter = True

  print(iced_filter, hot_filter)
  if (not iced_filter and not hot_filter):
    ranked = jaccard(query, sm_df, [i for i in range(len(sm_df))], num_cocktails, treebank_tokenizer)
  else:
    ranked = icedHot(query, sm_df, iced_filter, hot_filter)
  scores = top_scores(ranked)

  if not query:
    data = []
    output_message = ''
  else:
    output_message = "Results: " + query
    if iced_filter:
      output_message += ", Iced"
    if hot_filter:
      output_message += ", Hot"
    data = scores
  return render_template('search.html', name=project_name, netid=net_id, output_message=output_message, data=data)


