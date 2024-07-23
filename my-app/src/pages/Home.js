const { Link } = require("react-router-dom");

function Home(props) {
  return (
    <div id="homeContainer">
      <Link to="/login">로그인 페이지 이동</Link>
    </div>
  );
}

export default Home;
