const PostItem = ({ mainBackgroundColor, timeBackgroundColor, children }) => {
  
  return (
    <>
      <div className="col-lg-4 col-md-6 my-3">
        <div className="card post-item" style={{backgroundColor: mainBackgroundColor}}>
            <div className="card-header mb-0">
              <small><time dateTime="12/12/2024" className="time" style={{backgroundColor: timeBackgroundColor}}>12hr ago</time></small>
              <h5 className="card-title m-0">Task, Service or Product</h5>
            </div>
            <div className="card-body">
                <p className="mb-0 small price">Price: GHC 3000</p>
                {children}
                <p className="mb-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Corporis id dolore inventore, non aut ex nostrum nemo dolorem obcaecati veritatis?
                </p>
                <p><button className="btned btned-danger w-100 mt-4">Details</button></p>
            </div>
        </div>
      </div>
    </>
  );
}
export default PostItem