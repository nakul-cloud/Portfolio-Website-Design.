import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useSound from 'use-sound';
import { PLAY_SOUND, HOVER_SOUND } from '../utils/sounds';

interface SoundContextType {
    playClick: () => void;
    playHover: () => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    // Initialize from local storage
    useEffect(() => {
        const savedMute = localStorage.getItem('sfx-muted');
        if (savedMute !== null) {
            setIsMuted(JSON.parse(savedMute));
        }
    }, []);

    const toggleMute = () => {
        setIsMuted(prev => {
            const newState = !prev;
            localStorage.setItem('sfx-muted', JSON.stringify(newState));
            return newState;
        });
    };

    const [playClickSound] = useSound(PLAY_SOUND, { volume: 0.5 });
    const [playHoverSound] = useSound(HOVER_SOUND, { volume: 0.2 });

    const playClick = useCallback(() => {
        if (!isMuted) {
            playClickSound();
        }
    }, [isMuted, playClickSound]);

    const playHover = useCallback(() => {
        if (!isMuted) {
            playHoverSound();
        }
    }, [isMuted, playHoverSound]);

    return (
        <SoundContext.Provider value={{ playClick, playHover, isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSFX = () => {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSFX must be used within a SoundProvider');
    }
    return context;
};
