import pandas as pd
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import GridSearchCV
import joblib

# For Data visualization
# import pyLDAvis
# import pyLDAvis.sklearn

NUM_TOPICS = 100  
TOP_WORDS = 10  # Number of top words to display for each topic.

def load_data():
    data = pd.read_csv("./data/training_data_v1_cleaned.csv")
    return data

def train_lda(data, n_topics=NUM_TOPICS):
    lda_model = LatentDirichletAllocation(n_components=n_topics, max_iter=10, learning_method='online', random_state=42)
    lda_output = lda_model.fit_transform(data)
    return lda_model, lda_output

# Display the top words for each topic
def display_topics(model, vectorizer, n_words=TOP_WORDS):
    terms = vectorizer.get_feature_names_out()
    for idx, topic in enumerate(model.components_):
        print("Topic %d:" % (idx))
        print([(terms[i], topic[i]) for i in topic.argsort()[:-n_words - 1:-1]])

# Simplified evaluation using Log Likelihood and Perplexity.
def evaluate_model(model, data):
    # Log Likelyhood: Higher the better
    print("Log Likelihood: ", model.score(data))
    
    # Perplexity: Lower the better. Perplexity = exp(-1. * log-likelihood per word)
    print("Perplexity: ", model.perplexity(data))

def main():
    data = load_data()
    vectorizer = CountVectorizer()  # Reinitialize vectorizer to retrieve terms later
    data_vectorized = vectorizer.fit_transform(data['Cleaned_Chat'])
    
    lda_model, lda_output = train_lda(data_vectorized)
    display_topics(lda_model, vectorizer)
    
    evaluate_model(lda_model, data_vectorized)

    # Save the LDA model and the vectorizer 
    joblib.dump(lda_model, "models/lda_model.pkl")
    joblib.dump(vectorizer, "models/vectorizer.pkl")



if __name__ == "__main__":
    main()

