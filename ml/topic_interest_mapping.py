import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import joblib 
import os
from transformers import pipeline

LDA_MODEL_PATH = os.path.join("models", "lda_model.pkl")
VECTORIZER_PATH = os.path.join("models", "vectorizer.pkl")

lda_model = joblib.load(LDA_MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

zero_shot_classifier = pipeline("zero-shot-classification", model="MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli")

topics = [
    "bucks spent skin worth fit story collecting french short major",
    "joining secret body workout virtual challenge found stamps spot tea",
    "thing pet dropping soon video funniest amazing soup woodworking cool",
    "goat boba passion fruit today squad got mango old bought",
    "night stars clear game got puzzles new gryffindor mind inspired",
    "guys kicks freshest copped drop yoga af new webcomic tattoo",
    "catch tonight setting theatre stargazing telescope play downtown diving wanted",
    "whitewater rafting exciting terrifying snapchat camping joining reading vintage setting",
    "horseback going ranch riding tomorrow knitting art piece retreat month",
    "diy ideas saw getting tiktok tattoo minimalist embroidery thinking obsessed",
    "city cottagecore harder brownie outfits tomorrow good camping activities dance",
    "fit sewing play woodworking recommend beautiful shop birdwatching caught read",
    "inspo new cuz bujo journal got online thing secret planning",
    "viral person learning sesh arts build shop senioritis scrunchies fruit",
    "amazing adventure trying recipe nature brownie kayaking perfect chat pinterest",
    "skrrt got wants driver ride license night logo start brewing",
    "new tiktok struggling pls explain dance beach adopted vocals killer",
    "aesthetic sneakers daily chat brownie sewing bop collection spa diving",
    "shop thrift pop hitting weekend kid practicing daily stamps local",
    "remember dude night series planking worth watching let inspo spilled",
    "decision bullet best aesthetic plant filter video martial kill sesh",
    "pottery try going class zodiac tonight says wish ice luck",
    "vibing pop new bop jungle look photoshoot quiz dungeons dorm",
    "rollerblading ideas spotify park filter puzzles fencing yoga crafting spree",
    "lowkey aerial yoga tried let library coming prom brewing sneaker",
    "dude sewing party fomo hand cool real saw bag beach",
    "session epic dungeons dragons night weekend outfits hogwarts mood rock",
    "class pottery beautiful vase rewarding got game hey snorkeling billie",
    "killer snapped beach gram movie shots tonight send college hair",
    "good collab mystery senioritis outfits look story billie squad lately",
    "tattoo copped trip crafting learn sesh soup thrift jungle vegetable",
    "build gram peaceful pet pastel climbing piece sale lately trend",
    "chat fi gon recommend adopted kill camping succulent look room",
    "vibes girl today scrunchies vsco flask hydro glassblowing ideas snapchat",
    "try crafting video cool leather watched morning meditating feels refreshing",
    "started journaling activities daily concert mango tea stores new inspired",
    "plans trick stamps bujo gryffindor downtown fomo skills af sustainable",
    "ranch going drop masks tomorrow collab horseback dying vibe chill",
    "volunteering animal shelter day local spent relatable prom arts upcycling",
    "new look ready trick learned painting card amazed cover omg",
    "let obsessed picnic cottagecore tomorrow beach swim bring hey weekend",
    "pizza recipe went ideas bracelets story video martial fruit cuz",
    "today intense arts tour class martial shots city great captured",
    "new game indie brownie perfect steam underrated recipe bro trying",
    "fashion blown sustainable documentary mind challenge watched bad tried viral",
    "billie peaceful snacks total week thinking group dead study recommend",
    "planning place spamming wanted journaling good hike watching sneaker river",
    "chill bet skatepark place tea sesh recommend tried hyped bubble",
    "binge webcomic series boba refreshing viral pottery body quilting masks",
    "watching cute jeans tutorial today great thrift french harder caught",
    "head mountains let weekend tour check setting rafting gryffindor breakdowns",
    "retreat attending meditation thinking flexing game mural feedback eilish copped",
    "surfing thinking found photoshoot insta city mural weekend taking coolest",
    "biking upcycling yoga cool thinking trail clothes mountain ideas vocals",
    "need book read rock spent riding ranch recommendations na bro",
    "new lit drop na wait gon season recs feeling designed",
    "start garden hyped vegetable flask worth soon quirkiest planking drop",
    "good place know paragliding meditating refreshing morning feels tea playlist",
    "sweater knitting finished thrilled theatre play catch therapy pics mountains",
    "skrrt aesthetic sale sculpting collab bring reality attending mountains bubble",
    "battle reef brilliant leather college copped garden bracelets setting read",
    "mix playlist eilish rock billie spotify judge camping plan trip",
    "thrifted quirkiest gold stores paragliding river room cool thrift inspo",
    "ready woodworking fashion thing vsco squad upcycling pop guitar birdwatching",
    "cover bucket ready omg pet spa new viral hydro woodworking",
    "thinking beautiful quilting old special got fabric ideas clothes upcycling",
    "check cool minecraft battle sickest later got sneakers build dance",
    "challenge remember ice bucket lol clear level knitting stargazing mountains",
    "join group summer trip chat plans road workout new dance",
    "dead relatable memes right studying week great total collection coming",
    "cool making pieces learn harder song trying pottery looks kid",
    "found brilliant homemade recipe city secret skateboarding perfect pizza spot",
    "park pop dragons spa shop guys rare inspired spotted library",
    "hand collection guys getting look sneaker started artwork anime inspired",
    "adventure underrated bro steam hard dead dying fish recommendations tonight",
    "come polaroid workout luck buying bop ranch week daily ready",
    "reality virtual level tried gaming puzzles setting jeans telescope month",
    "room plant central succulent adopted kayaking turning river kill buying",
    "practicing started skills ballet french learning guitar week recital archery",
    "freshest copped guys lol beach learned rare clear telescope challenge",
    "spamming finsta person filter trend emotional snapchat breakdowns different lol",
    "need college recs dorm overwhelming pinterest decor spent bracelets cool",
    "let start dibs band vocals vegetable digital coming planning guide",
    "aesthetic pics bought vintage polaroid new lo major playlists zen",
    "day today flexing learned went trick run card meditating best",
    "gold season cover worth species bag explain hard wanted bubble",
    "binge series sleep webcomic watching gang reading worth night need",
    "quiz lately gryffindor fascinating glassblowing hogwarts house plant spree buying",
    "viral youtube drama spilled watching tea need collection nature sunset",
    "thrilled new skateboard story ootd rate today fit skrrt driver",
    "cool trying found looking like noob total rollerblading mountain biking",
    "sleep snapped obsessed vsco shelter bracelets cafe person come wish",
    "feedback story copped pair making feels ride need singing pastel",
    "tiktok copped hard goat stamps recommend attending aesthetic blown writing",
    "shop pop project weekend hitting thrift road old river hope",
    "days fencing thrilling quiz na finsta wait tutorial real meditation",
    "catch lit sale like tour park total unforgettable binge face",
    "rock judge spotify billie mix eilish playlist concert sail weekend",
    "thinking right yolo hair pastel dying plan trip hyped mood",
    "experience snorkeling unforgettable reef na french online road zodiac camping"
]

predefined_interests = [
    "Reading", "Hiking", "Cooking", "Acting", "Shopping", "Writing", "Dancing",
    "Painting", "Swimming", "Knitting", "Running", "Singing", "Traveling",
    "Gardening", "Fishing", "Biking", "Drawing", "Climbing", "Skateboarding",
    "Photographing", "Crafting", "Baking", "Camping", "Skiing", "Surfing",
    "Kayaking", "Journaling", "Bowling", "Gaming", "Puzzling", "Birdwatching",
    "Music", "Quilting", "Scuba diving", "Skydiving", "Paragliding", "Horseback riding",
    "Pottery", "Yoga", "Martial arts", "Storytelling", "Studying languages",
    "Meditating", "Hunting", "Sculpting", "Archery", "Designing", "Sewing",
    "Magic", "Fencing", "Sailing", "Whitewater rafting", "Snorkeling", "Rollerblading",
    "Ice skating", "Snowboarding", "Ballet", "Woodworking", "Leatherworking",
    "Glassblowing", "Astronomy", "Collecting", "Volunteering", "Brewing",
    "Astrology", "Eating"
]


# Function to display top words for each topic
def display_topics(model, feature_names, no_top_words):
    for topic_idx, topic in enumerate(model.components_):
        print(f"Topic {topic_idx}:")
        print(" ".join([feature_names[i]
                        for i in topic.argsort()[:-no_top_words - 1:-1]]))
        print()


# Display dominant words for each topic
display_topics(lda_model, vectorizer.get_feature_names_out(), 10)


def map_topics_to_interests():
    topic_to_interest_mapping = {}
    for idx, topic in enumerate(topics):
        # Perform zero-shot classification to assign the topic to an interest
        result = zero_shot_classifier(topic, predefined_interests)

        # Extract the label (i.e., the predicted interest) with the highest score
        assigned_interest = result['labels'][0]

        # Map the topic to the assigned interest
        topic_to_interest_mapping[topic] = assigned_interest
        
        # Print the current topic, its assigned interest, and the score for real-time monitoring
        print(f"Topic {idx+1}: {topic}")
        print(f"Assigned Interest: {assigned_interest} (Score: {result['scores'][0]:.4f})")
        print('-' * 60)  # Prints a separator for better readability

    return topic_to_interest_mapping


topic_to_interest_mapping = map_topics_to_interests()

# Save the mapping for future use
MAPPING_PATH = os.path.join("models", "topic_interest_mapping.pkl")
joblib.dump(topic_to_interest_mapping, MAPPING_PATH)

print("Mapping saved successfully!")
