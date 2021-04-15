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

	jaccard_sim = jaccard(query, sm_df, num_cocktails, treebank_tokenizer)
	scores = top_scores(jaccard_sim)
	
	if not query:
		data = []
		output_message = ''
	else:
		output_message = "Your search: " + query
		data = scores
	return render_template('search.html', name=project_name, netid=net_id, output_message=output_message, data=data)


