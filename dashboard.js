import React, {useState, useEffect, useRef} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';

const App = ({}) => {
    const dateTime = new Date().toLocaleString("de-DE", {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const timer = useRef()
    const [time,
        setTime] = useState(dateTime);

    useEffect(() => {
        timer.current = setTimeout(() => setTime(new Date().toLocaleString("de-DE", {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })), 1000);

        return () => clearTimeout(timer.current)
    }, [time])

    return <box
        top="center"
        left="center"
        width="50%"
        height="50%"
        border={{
        type: "line"
    }}
        style={{
        border: {
            fg: 'blue'
        }
    }}>{`Today is ${time}`}</box>
}

const screen = blessed.screen({autoPadding: true, smartCSR: true, title: 'Developer Dashboard'})
screen.key([
    "escape", "q", "C-c"
], () => process.exit(0))

const component = render(
    <App/>, screen)