from . import *  
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder

project_name = "Liver Let Die - Personalized Cocktail Recommendations"
net_id = "Annika Opsasnick (aro42), Callie Aboaf (cha46), Kaysie Yu (ky276), Simran Puri (sp2262), Yunyun Wang (yw458)"

@irsystem.route('/', methods=['GET'])
def search():
	query = request.args.get('search')
	if not query:
		data = []
		output_message = ''
	else:
		output_message = "Your search: " + query
		data = range(5)
	return render_template('index.html', name=project_name, netid=net_id, output_message=output_message, data=data)



