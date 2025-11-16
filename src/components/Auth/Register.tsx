export default function Register() {
  enum RoleType {
    USER = "user",
    ADMIN = "admin",
  }
  return (
    <>
      <div className="lg:hidden text-white">
        <div>
          <h1>Create Account!</h1>
          <h2>Welcome abroad developer!</h2>
          <div>
            <h1>Username</h1>
            <input type="text" placeholder="Vladimir petrovsky" />
          </div>

          <div>
            <h1>email</h1>
            <input type="email" placeholder="example@gmail.com" />
          </div>

          <div>
            <h1>password</h1>
            <input type="password" placeholder="Enter you password" />
          </div>

          <div>
            <h1>role</h1>
            <select name="">
              <option value={RoleType.USER}>User</option>
              <option value={RoleType.ADMIN}>Admin</option>
            </select>
          </div>

          <div>
            <h1>Date of Birth</h1>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              aria-label="Date of Birth"
            />
          </div>

          <div>
            <h1>location</h1>
            <input type="text" placeholder="Country, City" />
          </div>
        </div>
      </div>

      <div className="lg:block hidden"></div>
    </>
  );
}