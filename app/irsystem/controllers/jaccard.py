import pandas as pd
import os
import numpy as np
import nltk
import re
from nltk.tokenize import TreebankWordTokenizer
from nltk.corpus import stopwords

from .jaccard_helper import df, tokenized_df,sim_feature_weights, clean_query, n_cocktails, sm_df

# initalized nltk tokenizer function
treebank_tokenizer = TreebankWordTokenizer()

def score(terms,query):
    num = len(list(set(terms).intersection(query)))
    denom = len(list(set(terms).union(query)))
    score = 0 if denom == 0 else num/denom
    return score

def weight_score(row,weights,query):
    for col_name, weight in weights.items():
        j_score = score(row[col_name],query)  
        row[col_name] = weights[col_name] * j_score
    return row 


def jaccard(input_query, input_df, weights, indexes, tokenizer=treebank_tokenizer):
    """Return a list of length num_cocktails where index i is the weighted sum of Jaccard 
    similarities between the query terms and columns in the data
    
    Params: {input_query: String,
             input_df: Pandas df,
             weights: dict,
             indexes: list,
             tokenizer: a TreebankWordTokenizer}
    Returns: np.ndarray
    """
    # TODO: make compatible with indexes 
    input_df = input_df.iloc[indexes, :]
    print("inside jaccard\n",input_df)
    query = clean_query(input_query, tokenizer)

#     display(input_df)
    weighted_score_df = input_df.apply(weight_score,args=(weights,query,), axis=1)
#     display(weighted_score_df)
    jac_sim = weighted_score_df.sum(axis = 1, skipna = True) # add up jaccard scores
    
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
    return jaccard(query, tokenized_df.copy(),sim_feature_weights, indexes_include,  tokenizer=treebank_tokenizer)

# initalize variables for jaccard function call 
num_cocktails = df.shape[0]

# retrieve the top 10 most similar names to the query term
def top_scores(jac_sim):
    """Return a list of row object where key is the column name, containing the top ten jaccard similarity scores
    
    Params: {jac_sim: Pandas Series}
    Returns: List of json objects
    """
    print("inside top scores", jac_sim)
    jaccard_sorted = jac_sim.sort_values(ascending=False) # sort in descending order 
    top_10 = jaccard_sorted.head(10)  # get the top 10 indices and scores
    top_10 = top_10[top_10!=0]    # remove zero scores

    print(top_10)

    top_10_idx = top_10.index.tolist() # get list of indexes
    top_10_df = df.iloc[top_10_idx, :] # get rows of top "ten" indexes
    top_10_json = top_10_df.to_json(orient='records')

    return top_10_json


    """
        # map the scores to the index in a list of tuples
        jaccard_scores = []
        for idx,score in jac_sim.iteritems():
            print(idx,score)
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
        top_10_df = df.iloc[top_10_idx, :]
        top_10_json = top_10_df.to_json(orient='records')

        return top_10_json
    """




