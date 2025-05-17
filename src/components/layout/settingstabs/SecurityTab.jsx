
function SecurityTab() {
  return (
    <>
      <div id="security" className="securitypref d-flex">
        <form action="" method="post" encType="multipart/form-data">
          <h2>Change Password</h2>
          <div className="border-bottom"></div>
          <div className="password-change d-flex flex-column">
              <label htmlFor="currentpassword">
                <i className="bi bi-lock-fill"></i> Current Password
              </label>
              <input type="password" id="currentpassword" placeholder="Current Password" name="password"/>
            </div>
            <div className="password-change d-flex flex-column">
              <label htmlFor="newpassword">
                <i className="bi bi-lock-fill"></i> New Password
              </label>
              <input type="password" id="newpassword" placeholder="New Password" name="password"/>
            </div>
            <div className="password-change d-flex flex-column">
              <label htmlFor="confirmpassword">
                <i className="bi bi-check2-circle"></i> Confirm Password
              </label>
              <input type="password" id="confirmpassword" placeholder="Confirm Password" name="password"/>
            </div>
        </form>
      </div>
    </>
  )
}

export default SecurityTab
