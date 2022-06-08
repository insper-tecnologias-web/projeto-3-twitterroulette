import "./Tweet.css";

export default function Tweet(props) {
  const { tweet, usuario: user, retweet } = props.game;
  const {
    nome_usuario: userName,
    img_usuario: userImg,
    conta_usuario: userAccount,
  } = user;
  const {
    conteudo: content,
    data: date,
    nome_dono: ownerName,
    url_avatar_dono: ownerProfilePic,
    urls_img_tweet: urlsImages,
    usuario_dono: userOwner,
  } = tweet;

  console.log(content);
  function filterContent() {
    let filteredContent;
    if (retweet) {
      filteredContent = content.slice(content.indexOf(":") + 1);
    } else {
      filteredContent = content;
    }

    if (filteredContent.includes("https://t.co")) {
      filteredContent = filteredContent.slice(
        0,
        filteredContent.indexOf("https://t.co") - 1
      );
    }
    return filteredContent;
  }

  return (
    <div className="tweet-container" id={"tweet-container-" + props.theme}>
      {/* {retweet && (
                <div className="retweet-header">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        class="r-1bwzh9t r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
                    >
                        <g>
                            <path d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z"></path>
                        </g>
                    </svg>
                    <h1>You Retweeted</h1>
                </div>
            )} */}
      <div className="tweet-header">
        <div className="container-img-user">
          <div className="container-img">
            <img
              className="tweet-avatar-img"
              src={retweet ? ownerProfilePic : userImg}
            />
          </div>
          <div className="name-user-container">
            <h1 className="name">{retweet ? ownerName : userName}</h1>
            <h2 className="user" id={"user-" + props.theme}>
              {retweet ? userOwner : userAccount}
            </h2>
          </div>
        </div>
        <div className="logo-container">
          <img src="./twitter-logo-4.png" className="logo" />
        </div>
      </div>
      <div className="content-container">
        <p className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suscipit
          ex ac dui congue, in blandit lorem commodo. Suspendisse fringilla
          vehicula varius. Duis cursus quam ultrices nisl interdum pulvinar. Nam
          convallis, ipsum ac ullamcorper volutpat, diam leo iaculis dolor, ut
          luctus lectus lorem nec risus.{" "}
        </p>
        {urlsImages && (
          <div className="tweet-imgs-container">
            {urlsImages.map((url, index) => (
              <img className="tweet-img-content" key={index} src={url} />
            ))}
          </div>
        )}
        <p className="date-time" id={"date-time-" + props.theme}>
          11:32 PM · May 19, 2022
        </p>
      </div>
    </div>
  );
}
