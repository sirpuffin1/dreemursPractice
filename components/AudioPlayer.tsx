import { FC, useRef, useState } from "react";

type AudioProps = {
    audioSrc: string
}

const AudioPlayer: FC<AudioProps> = ({audioSrc}) => {
    const [isPlaying, setIsPlaying ] = useState(false)
    const audioRef = useRef(new Audio(audioSrc))
    return (
        <>
            <audio id="audioThing" controls src={audioSrc}></audio>
        </>
    );
}

export default AudioPlayer;