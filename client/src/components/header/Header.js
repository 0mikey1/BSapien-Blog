import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">BSAPIEN</span>
        <span className="headerTitleSm">To Share Is Human.</span>
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1581337204873-ef36aa186caa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2056&q=80"
        alt=""
      />
    </div>
  );
}
