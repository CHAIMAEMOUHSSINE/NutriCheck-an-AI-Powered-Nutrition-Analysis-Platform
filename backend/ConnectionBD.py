import firebase_admin
from firebase_admin import credentials, db, auth


from datetime import datetime

print(firebase_admin.__version__)

cred = credentials.Certificate("C:/Users/Chaimae/Desktop/NutriCheck/backend/BDprivateKey/serviceAccountKey.json")
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://nutricheck-f4516-default-rtdb.europe-west1.firebasedatabase.app/"
    })

users_ref = db.reference("users")
foods_ref = db.reference("food")
historique_ref = db.reference("historique")


# users
def add_user(name, email, age, phone, password):
    # 1️⃣ Create user in Firebase Authentication
    auth_user = auth.create_user(
        email=email,
        password=password,
        display_name=name,
        phone_number=phone
    )
    uid = auth_user.uid

    # 2️⃣ Add user info to Realtime Database
    users_ref.child(uid).set({
        "name": name,
        "email": email,
        "phone": phone,
        "age": age,
        "password": password
        # Do NOT store plain password in database
    })
    return uid


def get_user(user_id):
    return users_ref.child(user_id).get()

def update_user(user_id, data: dict):
    users_ref.child(user_id).update(data)
    
def delete_user(user_id):
    users_ref.child(user_id).delete()
    
# foods
def add_food(food_data: dict):
    new_food_ref = foods_ref.push(food_data)  # always push
    return new_food_ref.key  # return the auto-generated food ID

def get_food(food_id):
    return foods_ref.child(food_id).get()

def update_food(food_id, data: dict):
    foods_ref.child(food_id).update(data)
    
def delete_food(food_id):
    foods_ref.child(food_id).delete()

# historique
def add_history(user_id, food_id, date=None):
    if not date:
        date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    historique_ref.push({
        "user_id": user_id,
        "food_id": food_id,
        "date": date
    })

def get_history_by_user(user_id):
    return historique_ref.order_by_child("user_id").equal_to(user_id).get()


def get_all_history():
    return historique_ref.get()
