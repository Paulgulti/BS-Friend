import React from 'react'

const VideoSection = () => {
    return (
        <div className='flex flex-col items-center my-10'>
            <h2 className='font-semibold md:text-xl text-center mb-2 md:mb-3'>See the App in Action</h2>
            <video
                width="280"
                height="240"
                controls
                preload="none"
                autoPlay
                playsInline
                muted
                className='rounded-xl'
            >
                <source src="/BSFriendVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p className='italic text-xs md:text-md'>Easy Bible navigation, with an AI bible study buddy.</p>
        </div>
    )
}

export default VideoSection