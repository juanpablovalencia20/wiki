import "./addPost.scss";


function AddPost () {
 
  
  
  
 
  
    
  
    return (
      <div className="share">
        <div className="container">
          <div className="top">
            <div className="left">
        
             
            </div>
         
          </div>
          <hr />
          <div className="bottom">
            <div className="left">
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
            
              />
              <label htmlFor="file">
                <div className="item">
                  <img src={Image} alt="" />
                  <span>Add Image</span>
                </div>
              </label>
              <div className="item">
                <img src={Map} alt="" />
                <span>Add Place</span>
              </div>
              <div className="item">
                
                <span>Tag Friends</span>
              </div>
            </div>
            <div className="right">
       
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AddPost;
