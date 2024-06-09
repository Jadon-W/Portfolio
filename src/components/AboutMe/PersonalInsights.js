import React, { useState } from 'react';
import './PersonalInsights.css';

const PersonalInsights = () => {
    const [activeTab, setActiveTab] = useState('Coding Philosophy');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const tabs = [
        { name: "Coding Philosophy", icon: "💻" },
        { name: "Industry Trends", icon: "🔮" },
        { name: "Technology Experiences", icon: "🛠️" },
        { name: "Career Highlights", icon: "🌟" },
        { name: "Lessons Learned", icon: "📚" },
        { name: "Future Goals", icon: "🚀" },
        { name: "Testimonials", icon: "🗣️" },
        { name: "Contact & Networking", icon: "🌐" }
    ];

    const insights = {
        "Coding Philosophy": [
            { label: "Belief", content: "Everyone should be able to create whatever they want as long as it doesn't lead to the downfall of something or someone else. There's a reason why it's called the World Wide Web. It's because it's made for everyone to infinitely explore and make anything they want." },
            { label: "Approach", content: "For software development, I believe there are many ways to approach it, and the only 'right' way is to reach a completed project that helps as many people as possible." },
            { label: "Problem-Solving", content: "When solving coding problems, I first look at the entire problem to understand it fully. Then, I plan the best approach by weighing the pros and cons to find the solution that addresses the problem effectively and minimizes the chance of recurrence." }
        ],
        "Industry Trends": [
            { label: "Excitement", content: "I find AI really exciting. Despite its potential dangers, I believe AI will lead to the betterment of many issues plaguing the world today." },
            { label: "Neuralink", content: "Neuralink is another exciting technology because it can solve many problems and offers limitless potential for productivity integrations." },
            { label: "Predictions", content: "My predictions for the future of technology: AI will continue to progress until we have androids, which could either lead to the destruction of humanity or uplift it." }
        ],
        "Technology Experiences": [
            { label: "Technologies", content: "I've worked extensively with React, HTML, CSS, Node.js, Machine Learning, Data Analytics, Firebase, and PostgreSQL because these technologies are interesting, flexible, and help me create the most creative and well-designed projects." },
            { label: "Challenges", content: "Challenges with React include dependency and third-party library issues. Trying new libraries often brings issues due to changes made by the creators or compatibility problems with the project. Keeping track of different versions and their compatibility is also a challenge." },
            { label: "PostgreSQL", content: "For PostgreSQL, sometimes adding data to the database is challenging due to configuration issues between the project, Postman, and PgAdmin. Despite these challenges, I love working with these technologies." }
        ],
        "Career Highlights": [
            { label: "Projects", content: "My major projects are the BarCrawl App and the Next-Door Helpers app. These are my most fully fleshed-out projects, made to solve problems and help a wide range of people." },
            { label: "Proud Project", content: "I'm particularly proud of my AI Health Assistant project. This app tracks users' personalized health data and gives them advice on how to get healthier. More details about this project can be found in the second cube." }
        ],
        "Lessons Learned": [
            { label: "Failures", content: "Failures are necessary in tech. Developers should always make their applications with the users in mind." },
            { label: "Influence", content: "These lessons have influenced my work by continuously aiding me in making the best applications possible, ensuring every step I take towards completion results in the best product." }
        ],
        "Future Goals": [
            { label: "Internship", content: "My main goal right now is to get my first internship. Throughout this portfolio, I hope I've proven that I'm capable of positively impacting the tech world. I need the opportunity to work with other professionals and continue creating and contributing to great projects." },
            { label: "Successful App", content: "Other goals include making a successful app that many people use and continuing to learn and grow as a Software Engineer. No matter what happens, I will keep progressing in the field and try to make applications that help as many people as I can." },
            { label: "Skills", content: "Specific skills or areas I want to develop: Machine Learning, Software Design, and Stock Predicting." }
        ],
        "Testimonials": [
            { label: "Derrick L.", content: "He really tries to make the best application possible. His work ethic is really shown through everything, and the number of projects he's made is insane." }
        ],
        "Contact & Networking": [
            { title: "Email", content: "Email me anytime via <a href='mailto:webbjado@msu.edu'>webbjado@msu.edu</a>", icon: "✉️" },
            { title: "LinkedIn", content: "Connect with me on LinkedIn<a href='https://www.linkedin.com/in/jadon-webb-0b3883214/' target='_blank' rel='noopener noreferrer'> here</a>", icon: "🔗" },
            { title: "GitHub", content: "Check out my projects on GitHub <a href='https://github.com/Jadon-W' target='_blank' rel='noopener noreferrer'> here</a>", icon: "🐙" }
        ]
    };

    const renderTabContent = () => {
        const content = insights[activeTab];
        return (
            <div className={`content ${activeTab.toLowerCase().replace(/ /g, '-')}`}>
                {activeTab === "Contact & Networking" ? (
                    <div className="contact-content">
                        {content.map((item, index) => (
                            <div key={index} className="contact-item">
                                <div className="contact-icon">
                                    <span role="img" aria-label={item.title}>{item.icon}</span>
                                </div>
                                <h4>{item.title}</h4>
                                <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                <a href={item.content.match(/href='(.*?)'/)[1]} target="_blank" rel="noopener noreferrer" className="contact-button">Go to {item.title}</a>
                            </div>
                        ))}
                    </div>
                ) : (
                    content.map((item, index) => (
                        <div key={index} className="content-card">
                            <div className="card-label">{item.label}</div>
                            <div className="card-content">
                                <p>{item.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    };

    return (
        <div className={`personal-insights-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="animated-gradient-background"></div>
            {!isDarkMode && (
                <>
                    <div className="shape small"></div>
                    <div className="shape medium"></div>
                    <div className="shape large"></div>
                    <div className="shape extra-small"></div>
                    <div className="shape extra-large"></div>
                </>
            )}
            {isDarkMode && (
                <>
                    <div className="star star-small"></div>
                    <div className="star star-medium"></div>
                    <div className="star star-large"></div>
                    <div className="star star-extra-small"></div>
                    <div className="star star-extra-large"></div>
                    <div className="star star-1"></div>
                    <div className="star star-2"></div>
                    <div className="star star-3"></div>
                    <div className="star star-4"></div>
                    <div className="star star-5"></div>
                    <div className="star star-6"></div>
                    <div className="star star-7"></div>
                    <div className="star star-8"></div>
                    <div className="star star-9"></div>
                    <div className="star star-10"></div>
                    <div className="star star-11"></div>
                    <div className="star star-12"></div>
                    <div className="star star-13"></div>
                    <div className="star star-14"></div>
                    <div className="star star-15"></div>
                    <div className="star star-16"></div>
                    <div className="star star-17"></div>
                    <div className="star star-18"></div>
                    <div className="star star-19"></div>
                    <div className="star star-20"></div>
                    <div className="star star-21"></div>
                    <div className="star star-22"></div>
                    <div className="star star-23"></div>
                    <div className="star star-24"></div>
                    <div className="star star-25"></div>
                    <div className="star star-26"></div>
                    <div className="star star-27"></div>
                    <div className="star star-28"></div>
                    <div className="star star-29"></div>
                    <div className="star star-30"></div>
                    <div className="star star-31"></div>
                    <div className="star star-32"></div>
                    <div className="star star-33"></div>
                    <div className="star star-34"></div>
                    <div className="star star-35"></div>
                    <div className="star star-36"></div>
                    <div className="star star-37"></div>
                    <div className="star star-38"></div>
                    <div className="star star-39"></div>
                    <div className="star star-40"></div>
                    <div className="moon">
            <div className="small-crater"></div>
            <div className="small-crater"></div>
            <div className="small-crater"></div>
        </div>
                </>
            )}
            <div className="toggle-mode">
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </div>
            <h2>Personal Insights</h2>
            <p>Welcome to my personal insights section! Here, I share my thoughts, experiences, and lessons learned throughout my journey in the tech industry. I hope you find these insights valuable and reflective of my passion for technology.</p>

            <div className="personal-insights-tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`personal-insights-tab-button ${activeTab === tab.name ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        <span className="tab-icon" aria-label={tab.name}>{tab.icon}</span> {tab.name}
                    </button>
                ))}
            </div>

            <div className="personal-insights-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default PersonalInsights;