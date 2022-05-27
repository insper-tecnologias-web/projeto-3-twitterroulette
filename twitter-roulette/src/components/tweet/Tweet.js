import "./Tweet.css";

export default function Tweet(props) {
    return (
        <div className="tweet-container" id={"tweet-container-" + props.theme}>
            <div className="tweet-header">
                <div className="container-img">
                    <img
                        className="img"
                        src="https://pbs.twimg.com/profile_images/1439967563627352067/8uDh41JK_normal.jpg"
                    />
                </div>
                <div className="name-user-container">
                    <h1 className="name">Felipe Schiavinato</h1>
                    <h2 className="user" id={"user-" + props.theme}>
                        @Schi4vF
                    </h2>
                </div>
                <div className="logo-container">
                    <img src="./twitter-logo-4.png" className="logo" />
                </div>
            </div>
            <div className="content-container">
                <p className="content">
                    Pai fez um carbonara dos deuses hj tá &#x1f90c; 🇮🇹 🍝
                </p>
                <p className="date-time" id={"date-time-" + props.theme}>
                    11:32 PM · May 19, 2022
                </p>
            </div>
        </div>
    );
}
