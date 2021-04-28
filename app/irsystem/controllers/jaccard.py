import pandas as pd
import os
import numpy as np
from nltk.tokenize import TreebankWordTokenizer

# load in the data
data_file = os.path.join(os.path.dirname(__file__), "dataset.csv")
# print(data_file)
# print((os.getcwd()))
df = pd.read_csv(data_file)

# initalized nltk tokenizer function
treebank_tokenizer = TreebankWordTokenizer()

input_df = df

# combine all columns to check against in input_df for each row    
sm_df = input_df['base_spirits'].map(str) + ' ' + input_df['name'].map(str) + ' ' + input_df['description'].map(str) + ' ' + input_df['ingredients'].map(str)

# tokenize, lowercase, and remove punctuation from sm_df
for idx,name in enumerate(sm_df):
    tokenized_name = name.split()
    sm_df[idx] = [w.lower() for w in tokenized_name if w.isalpha()]

def jaccard(input_query, input_data, indexes_include, num_cocktails, tokenizer=treebank_tokenizer):
    """Return a list of length num_cocktails where index i is the Jaccard 
    similarity between the query terms and the cocktail name
    
    Params: {query: String,
             data: Pandas df,
             num_cocktails: Integer,
             tokenizer: a TreebankWordTokenizer}
    Returns: np.ndarray
    """
    
    # initialize array that will contain similarity scores
    jac_sim = np.zeros((1, num_cocktails))
    
    # tokenize, lowercase, and remove punctuation from input_query 
    input_query = str(input_query)
    tok_list = tokenizer.tokenize(input_query)
    
    query = [q.lower() for q in tok_list if q.isalpha()]
    
    # loop through cocktail name col and compute the jaccard similarity score
    for idx,name in enumerate(sm_df):
        if idx in indexes_include:
          # calculate num and denom for the ratio
          num = len(list(set(name).intersection(query)))
          denom = len(list(set(name).union(query)))
          
          if denom != 0:   # include in case the union of two sets is nothing
              ratio = num/denom

              # update the jac_sim ndarray with the jaccard similarity score
              jac_sim[0,idx] = ratio
        
    return jac_sim

# initalize variables for jaccard function call 
num_cocktails = df.shape[0]

# terms for filters
iced_terms = ['iced', 'ice', 'chilled', 'frozen']
hot_terms = ['hot', 'heated', 'warm']
def icedHot(query, inputs, iced, hot):
    indexes_include = []

    for idx,drink in enumerate(inputs):
        include = False
        if iced == True:
            for term in inputs[idx]:
                if term in iced_terms:
                    include = True
        if hot == True:
            for term in inputs[idx]:
                if term in hot_terms:
                    include = True
        if include == True:
            indexes_include.append(idx)
    
    print(indexes_include)
    return jaccard(query, sm_df, indexes_include, num_cocktails, tokenizer=treebank_tokenizer)

# initalize variables for jaccard function call 
num_cocktails = df.shape[0]

# retrieve the top 10 most similar names to the query term
def top_scores(jac_sim):
    """Return a list of row object where key is the column name, containing the top ten jaccard similarity scores
    
    Params: {jac_sim: np.ndarray}
    Returns: List
    """

    # map the scores to the index in a list of tuples
    jaccard_scores = []
    for idx,score in enumerate(jac_sim[0]):
        jaccard_scores.append((idx,score))
        
    # sort scores in ascending order
    jaccard_sorted = sorted(jaccard_scores, key=lambda x: -x[1])

    # get the top 10 indices and scores
    top_10 = []
    if len(jaccard_sorted) > 10:
        top_10.append(jaccard_sorted[:10])
    else:
        top_10.append(jaccard_sorted)

    # get the top 10 info to print on UI (name, ingredients, description, url, image)
    top_10_idx = [idx[0] for idx in top_10[0]]
    top_10_df = input_df.iloc[top_10_idx, :]
    top_10_json = top_10_df.to_json(orient='records')

    return top_10_json




