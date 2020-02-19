// Some utility functions to style and format text.
// Scroll to the bottom to see the formatting guide.

import React from 'react';

//const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>

const separate_resources = (text, gameState) => {
    let blocks = text.split('_');
    return (
        <>
            {blocks.map((t,i)=>{
                return i%2
                    ?
                        <font color="blue">
                            <b>
                                {t}
                            </b>
                            &nbsp;({
                                t in gameState.resourceCount ? Math.round(100*gameState.resourceCount[t])/100:0
                            })
                        </font>
                    :
                        t
            })}
        </>
    )
}

export const styledText = (text, gameState) => {
    if (text[0]==="!") {
        return (
            <font color="red">
                {separate_resources(text.substring(1,text.length),gameState)}
            </font>
        );
    }
    return separate_resources(text,gameState);
}

// Formatting guide for text
// *Resource Name* reports the resource name in blue and bold and tells you how many you have.
// !asdf puts asdf is Red.
