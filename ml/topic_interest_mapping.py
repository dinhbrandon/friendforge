import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import joblib 
import os

LDA_MODEL_PATH = os.path.join("models", "lda_model.pkl")
VECTORIZER_PATH = os.path.join("models", "vectorizer.pkl")

lda_model = joblib.load(LDA_MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)


# Function to display top words for each topic
def display_topics(model, feature_names, no_top_words):
    for topic_idx, topic in enumerate(model.components_):
        print(f"Topic {topic_idx}:")
        print(" ".join([feature_names[i]
                        for i in topic.argsort()[:-no_top_words - 1:-1]]))
        print()


# Display dominant words for each topic
display_topics(lda_model, vectorizer.get_feature_names_out(), 10)

# Interest array for visualization
# interests = [
#     "Reading", "Hiking", "Cooking", "Acting", "Shopping", "Writing", "Dancing",
#     "Painting", "Swimming", "Knitting", "Running", "Singing", "Traveling",
#     "Gardening", "Fishing", "Biking", "Drawing", "Climbing", "Skateboarding",
#     "Photographing", "Crafting", "Baking", "Camping", "Skiing", "Surfing",
#     "Kayaking", "Journaling", "Bowling", "Gaming", "Puzzling", "Birdwatching",
#     "Music", "Quilting", "Scuba diving", "Skydiving", "Paragliding", "Horseback riding",
#     "Pottery", "Yoga", "Martial arts", "Storytelling", "Studying languages",
#     "Meditating", "Hunting", "Sculpting", "Archery", "Designing", "Sewing",
#     "Magic", "Fencing", "Sailing", "Whitewater rafting", "Snorkeling", "Rollerblading",
#     "Ice skating", "Snowboarding", "Ballet", "Woodworking", "Leatherworking",
#     "Glassblowing", "Astronomy", "Collecting", "Volunteering", "Brewing",
#     "Astrology", "Eating"
# ]


def map_topics_to_interests():
    """
    Function to map LDA topic numbers to the associated interests.
    """
    return {
        0: 'Kayaking',
        1: 'Collecting',
        2: 'Gardening',
        3: 'Music',
        4: 'Music',
        5: 'Baking',
        6: 'Traveling',
        7: 'Photographing',
        8: 'Reading',
        9: 'Traveling'
    }

topic_to_interest_mapping = map_topics_to_interests()

# Save the mapping for future use
MAPPING_PATH = os.path.join("models", "topic_interest_mapping.pkl")
joblib.dump(topic_to_interest_mapping, MAPPING_PATH)

print("Mapping saved successfully!")
