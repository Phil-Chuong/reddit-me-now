import { useSelector } from "react-redux/es/hooks/useSelector";
import React from "react";
import { fetchComments } from "../../API/CommentsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import './Comments.css';

const Comments = ({permalink}) => {   
    const comments = useSelector((state) => state.redditComments.comments)
    const loading = useSelector((state) => state.redditComments.loading);
    const error = useSelector((state) => state.redditComments.error);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(permalink)
        dispatch(fetchComments(permalink));
      }, [dispatch, permalink]);

      if(loading) {
        return <div>
            Loading....
        </div>
    }

    if(error) {
        console.log(error)
        return <div>
            Error: {error.message}
        </div>
    }

    return (
          
         <div className="comments-treads">
             {comments.map((comment) => (
                 <div key={comment.id} className="replies-container" >
                    <ul className="reddit-id">{comment.id}
                        <li className="replies">{comment.body}</li> 
                    </ul>
                    <br></br>                 
                 </div>

             ))}
         </div>
    );
};

export default Comments;

