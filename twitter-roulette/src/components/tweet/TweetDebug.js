import "./TweetDebug.css";

export default function TweetDebug(props) {
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

    // console.log(content);
    function filterContent() {
        let filteredContent;
        if (retweet) {
            filteredContent = content.slice(content.indexOf(":") + 1);
        } else {
            filteredContent = content;
        }

        if (filteredContent.includes("https://t.co")) {
            if (filteredContent.indexOf("https://t.co") - 1 < 0) {
                filteredContent = filteredContent.slice(
                    0,
                    filteredContent.indexOf("https://t.co")
                );
            } else {
                filteredContent = filteredContent.slice(
                    0,
                    filteredContent.indexOf("https://t.co") - 1
                );
            }
        }
        return filteredContent;
    }

    let typeTweetId;
    if (filterContent().length > 0 && urlsImages) {
        typeTweetId = "textimg";
    } else if (filterContent().length > 0 && !urlsImages) {
        typeTweetId = "text";
    } else {
        typeTweetId = "img";
    }
    // console.log("AAAAAAA");
    // console.log(typeTweetId);

    // typeTweetId = "textimg";
    // console.log(ownerProfilePic);

    // console.log("Data");

    // console.log(date);

    function filterDate() {
        let arrayData = date.split(" ");
        let horario = arrayData[3];
        let diaMesAno = `${arrayData[1]} ${arrayData[2]}, ${
            arrayData[arrayData.length - 1]
        }`;
        let militaryUsHour = horario.slice(0, 2);
        let militaryBrHour = militaryUsHour - 3;
        if (militaryBrHour < 0) {
            militaryBrHour += 24;
        }

        if (militaryBrHour > 12) {
            horario = militaryBrHour - 12 + horario.slice(2, 5) + " PM";
        } else {
            if (militaryBrHour > 9) {
                horario = militaryBrHour + horario.slice(2, 5) + " AM";
            } else {
                horario = militaryBrHour + horario.slice(2, 5) + " AM";
            }
        }

        return horario + " · " + diaMesAno;
    }

    return (
        <div className="tweet-container" id={`tweet-container-${typeTweetId}`}>
            <div className="tweet-header">
                <div
                    className="left-header-container"
                    id={`left-header-container-${retweet}`}
                >
                    <img
                        className="tweet-avatar-img"
                        id={`tweet-avatar-img-${typeTweetId}`}
                        src={retweet ? ownerProfilePic : userImg}
                    />
                    <div className="name-user-container">
                        <h1 className="tweet-name">
                            {retweet ? ownerName : userName}
                        </h1>
                        <h2 className="tweet-user" id={"user-" + props.theme}>
                            {retweet ? `@${userOwner}` : `@${userAccount}`}
                        </h2>
                    </div>
                </div>
                <img
                    className="tweet-logo"
                    src="./twitter-logo-4.png"
                    id={`tweet-logo-${typeTweetId}`}
                />
            </div>
            <div className="tweet-content">
                <p className="tweet-text" id={`tweet-text-${typeTweetId}`}>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras suscipit ex ac dui congue, in blandit lorem commodo.
                    Suspendisse fringilla vehicula varius. Duis cursus quam
                    ultrices nisl interdum pulvinar. Nam convallis, ipsum ac
                    ullamcorper volutpat, diam leo iaculis dolor, ut luctus
                    lectus lorem nec risus.{" "} */}
                    {filterContent()}
                </p>
                {urlsImages && (
                    <div
                        className="tweet-imgs-container"
                        id={`tweet-imgs-container-${typeTweetId}`}
                    >
                        {urlsImages.map((url, index) => (
                            <img
                                className="tweet-img-content"
                                id={`tweet-img-content-${typeTweetId}`}
                                key={index}
                                src={url}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="tweet-footer">{filterDate()}</div>
        </div>
    );
}
