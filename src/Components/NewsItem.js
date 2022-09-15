import React from 'react'

const NewsItem = (props) => {
        let { title, description, publishedAt, imageUrl, newUrl,source } = props;
        return (
            <div className='my-3 d-flex justify-content-center'>
                <div className="card" style={{ width: "20rem" }}>
                    <img src={imageUrl ? imageUrl : "https://cdn.wccftech.com/wp-content/uploads/2022/08/AMD-Ryzen-7000-Zen-4-Desktop-CPU-AM5-Platform-Delay-BIOS-Issues-_2.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className='card-text'><small>{new Date(publishedAt).toGMTString()}</small></p>
                        <h5 className="card-title">{title}... </h5>
                        <span className="  badge bg-dark mt-2 mb-2">{source}<span className="visually-hidden"></span></span>
                        <p className="card-text">{description}...</p>
                        <a rel="noreferrer" href={newUrl} target="_blank" className="btn btn-danger">Read More</a>
                    </div>
                </div>
            </div>
        )
}
export default NewsItem


//Add search bar