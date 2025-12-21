# authentication.py
from ConnectionBD import auth, users_ref,  add_user
from datetime import datetime

# ----------------------------
# REGISTER USER
# ----------------------------
def register_user(name, email, password, phone=None, age=None):
    try:
        user_record = auth.create_user(
            email=email,
            password=password,
            display_name=name,
            phone_number=phone
        )
        uid = user_record.uid

        # Store extra info in Realtime Database
        users_ref.child(uid).set({
            "name": name,
            "email": email,
            "phone": phone,
            "age": age,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

        return {"success": True, "uid": uid}
    except Exception as e:
        return {"success": False, "error": str(e)}

# ----------------------------
# LOGIN USER (via custom token)
# ----------------------------
def login_user(uid):
    try:
        custom_token = auth.create_custom_token(uid)
        return {"success": True, "token": custom_token.decode("utf-8")}
    except Exception as e:
        return {"success": False, "error": str(e)}

register_result = add_user(
    name="Test User",
    email="testuser@example.com", age=25, phone="+212600000001",
    password="mypassword123"
   
   
)
print("Register Result:", register_result)

# ----------------------------
# TEST LOGIN (generate custom token)
# ----------------------------
if register_result["success"]:
    uid = register_result["uid"]
    print("\nTesting Login (custom token)...")
    login_result = login_user(uid)
    print("Login Result:", login_result)