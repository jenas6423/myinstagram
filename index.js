var db;
var initalize = () => {
    let firebaseConfig = {
        apiKey: "AIzaSyCAwYBpngeSOww8A-en2up_SVulroL8ivQ",
        authDomain: "myinstagram-4ee18.firebaseapp.com",
        databaseURL: "https://myinstagram-4ee18.firebaseio.com",
        projectId: "myinstagram-4ee18",
        storageBucket: "myinstagram-4ee18.appspot.com",
        messagingSenderId: "426250294770",
        appId: "1:426250294770:web:ec437ac4cc9052361a476b"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
};

var get_data = (text_id, callback) => {
    let docRef = db.collection("comments").doc(text_id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            callback(text_id, doc.data());
        } else {
            // doc.data() will be undefined in this case
            callback(text_id, null);
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

var _load_comment = (post_id, content) => {
    post_id = post_id.replace("modal", "post");

    let comments = document.getElementById(post_id);
    comments.innerHTML = "";

    content["msg"].forEach((item, index)=>{
        $("#"+post_id).append(
            '<div class="row"><div class="col-3"><img class="modal-comment-img profile-pic" src="https://maxcdn.icons8.com/Share/icon/ios7/Cinema/anonymous_mask1600.png"/></div><div class="col-9"><label class="modal-comment-id profile-id">Anonymous</label><label class="msg">' + item["msg"] + '</label></div></div>'
        );
    })
}

var load_comments = ()=> {
    get_data("modal-1", _load_comment);
    get_data("modal-2", _load_comment);
}

var add_data = (text_id, content) => {
    db.collection("comments").doc(text_id).set(content);
}

var _add_comment = (text_id, fb_content) =>{
    let msg = document.getElementById(text_id);
    let content = {msg:msg.value};

    if(fb_content){
        fb_content["msg"].push(content);
    }else{
        fb_content = {msg:[content]};
    }

    add_data(text_id, fb_content);
    _load_comment(text_id, fb_content);
}

var post_comment = (text_id) => {
    get_data(text_id, _add_comment);
}



