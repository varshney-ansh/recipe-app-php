
import * as smd from "https://cdn.jsdelivr.net/npm/streaming-markdown/smd.min.js"
const chatbox = document.getElementById('chat');
const form = document.getElementById('chat-form');
const promptinput = document.getElementById('prompt');

const subspan = document.getElementById('subspan');

// subspan.addEventListener("click", form.submit());
document.addEventListener("DOMContentLoaded", function () {
    subspan.addEventListener("click", () => {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    });
})


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('submit')

    const usertext = promptinput.value.trim();
    if (!usertext) return;

    const usermessage = document.createElement('div');
    usermessage.className = "py-2 px-4 ml-auto rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-right max-w-fit bg-bg-grey";
    usermessage.textContent = usertext;
    chatbox.appendChild(usermessage);
    chatbox.scrollTop = chatbox.scrollHeight;

    promptinput.value = '';

    const botBubble = document.createElement('div');
    const cursor = document.createElement('div');
    botBubble.className = 'flex flex-col gap-3 w-full max-w-fit p-4';
    cursor.className = 'mt-[-24px] px-4 break-words';
    var icon = `<div class="w-full">
                                <img src="./star.png" alt="taste_ai" class="w-4 ml-[-16px]">
                            </div>`;
    botBubble.insertAdjacentHTML('beforeend', icon);
    botBubble.appendChild(cursor);
    chatbox.appendChild(botBubble);
    chatbox.scrollTop = chatbox.scrollHeight;

    const renderer = smd.default_renderer(cursor);
    const parser = smd.parser(renderer);


    const response = await fetch('chat.php', {
        method: "POST",
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ prompt: usertext }),
    })

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split('\n');

        for (const line of lines) {
            if (!line.startsWith('data: ')) continue;

            try {
                const json = JSON.parse(line.slice(5).trim());
                const text = json?.choices?.[0]?.delta?.content;
                // let livebuffer = '';  
                if (text) {
                    smd.parser_write(parser, text);
                    await new Promise(r => setTimeout(r, 15));

                    chatbox.scrollTop = chatbox.scrollHeight;
                }


            }
            catch (err) {
                // ignore
            }
        }

        buffer = '';
    }

    smd.parser_end(parser);
})


