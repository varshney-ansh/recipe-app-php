
import * as smd from "https://cdn.jsdelivr.net/npm/streaming-markdown/smd.min.js"
const chatbox = document.getElementById('chat');
const form = document.getElementById('chat-form');
const promptinput = document.getElementById('prompt');

const subspan = document.getElementById('subspan');
let messages = JSON.parse(localStorage.getItem('chat_messages')) || [];

document.addEventListener("DOMContentLoaded", function () {
    subspan.addEventListener("click", () => {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    });
})


form.addEventListener('submit', async (e) => {
    e.preventDefault();


    const usertext = promptinput.value.trim();
    if (!usertext) return;

    const wlc = document.getElementById("chat-wlc");
    if (wlc) {
        wlc.remove();
    }

    messages.push({
        role: 'user',
        content: usertext
    });

    const usermessage = document.createElement('div');
    usermessage.className = "py-3 px-4 ml-auto rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-right max-w-fit bg-bg-grey";
    usermessage.textContent = usertext;
    chatbox.appendChild(usermessage);
    chatbox.scrollTop = chatbox.scrollHeight;

    promptinput.value = '';
    const rand = Math.floor(Math.random() * 1000000);

    const botBubble = document.createElement('div');
    const cursor = document.createElement('div');
    botBubble.className = 'flex flex-col gap-3 w-full max-w-fit px-3 pt-4 pb-4';
    cursor.className = 'mt-[-36px] ml-4 px-4 break-words';
    cursor.id = usertext + rand;
    var icon = `<div class="w-8 h-8 ml-[-10px]">
                                <!-- <img src="./logob.png" alt="taste_ai" class="ml-[-16px]" width="36" height="36"> -->
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 32 32" width="32" height="32" preserveAspectRatio="xMidYMid meet"
                                    style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;">
                                    <defs>
                                        <clipPath id="__lottie_element_1377">
                                            <rect width="32" height="32" x="0" y="0"></rect>
                                        </clipPath>
                                        <g id="__lottie_element_1384">
                                            <g transform="matrix(0.12479999661445618,0,0,0.12479999661445618,4.986400604248047,4.986400604248047)"
                                                opacity="1" style="display: block;">
                                                <g opacity="1" transform="matrix(1,0,0,1,88.25,88.25)">
                                                    <path fill="url(#__lottie_element_1387)" fill-opacity="1"
                                                        d=" M-3.9000000953674316,-84.94999694824219 C-5.28000020980835,-79.47000122070312 -7.079999923706055,-74.13999938964844 -9.319999694824219,-68.93000030517578 C-15.15999984741211,-55.369998931884766 -23.15999984741211,-43.5 -33.33000183105469,-33.33000183105469 C-43.5,-23.170000076293945 -55.369998931884766,-15.15999984741211 -68.93000030517578,-9.319999694824219 C-74.12999725341797,-7.079999923706055 -79.47000122070312,-5.28000020980835 -84.94999694824219,-3.9000000953674316 C-86.73999786376953,-3.450000047683716 -88,-1.850000023841858 -88,0 C-88,1.850000023841858 -86.73999786376953,3.450000047683716 -84.94999694824219,3.9000000953674316 C-79.47000122070312,5.28000020980835 -74.13999938964844,7.079999923706055 -68.93000030517578,9.319999694824219 C-55.369998931884766,15.15999984741211 -43.5099983215332,23.15999984741211 -33.33000183105469,33.33000183105469 C-23.15999984741211,43.5 -15.149999618530273,55.369998931884766 -9.319999694824219,68.93000030517578 C-7.079999923706055,74.12999725341797 -5.28000020980835,79.47000122070312 -3.9000000953674316,84.94999694824219 C-3.450000047683716,86.73999786376953 -1.840000033378601,88 0,88 C1.850000023841858,88 3.450000047683716,86.73999786376953 3.9000000953674316,84.94999694824219 C5.28000020980835,79.47000122070312 7.079999923706055,74.13999938964844 9.319999694824219,68.93000030517578 C15.15999984741211,55.369998931884766 23.15999984741211,43.5099983215332 33.33000183105469,33.33000183105469 C43.5,23.15999984741211 55.369998931884766,15.149999618530273 68.93000030517578,9.319999694824219 C74.12999725341797,7.079999923706055 79.47000122070312,5.28000020980835 84.94999694824219,3.9000000953674316 C86.73999786376953,3.450000047683716 88,1.840000033378601 88,0 C88,-1.850000023841858 86.73999786376953,-3.450000047683716 84.94999694824219,-3.9000000953674316 C79.47000122070312,-5.28000020980835 74.13999938964844,-7.079999923706055 68.93000030517578,-9.319999694824219 C55.369998931884766,-15.15999984741211 43.5099983215332,-23.15999984741211 33.33000183105469,-33.33000183105469 C23.15999984741211,-43.5 15.149999618530273,-55.369998931884766 9.319999694824219,-68.93000030517578 C7.079999923706055,-74.12999725341797 5.28000020980835,-79.47000122070312 3.9000000953674316,-84.94999694824219 C3.450000047683716,-86.73999786376953 1.850000023841858,-88 0,-88 C-1.850000023841858,-88 -3.450000047683716,-86.73999786376953 -3.9000000953674316,-84.94999694824219z">
                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                        <path
                                            d=" M84.8499984741211,3.799999952316284 C83.47000122070312,9.279999732971191 81.66999816894531,14.609999656677246 79.43000030517578,19.81999969482422 C73.58999633789062,33.380001068115234 65.58999633789062,45.25 55.41999816894531,55.41999816894531 C45.25,65.58000183105469 33.380001068115234,73.58999633789062 19.81999969482422,79.43000030517578 C14.619999885559082,81.66999816894531 9.279999732971191,83.47000122070312 3.799999952316284,84.8499984741211 C2.009999990463257,85.30000305175781 0.75,86.9000015258789 0.75,88.75 C0.75,90.5999984741211 2.009999990463257,92.19999694824219 3.799999952316284,92.6500015258789 C9.279999732971191,94.02999877929688 14.609999656677246,95.83000183105469 19.81999969482422,98.06999969482422 C33.380001068115234,103.91000366210938 45.2400016784668,111.91000366210938 55.41999816894531,122.08000183105469 C65.58999633789062,132.25 73.5999984741211,144.1199951171875 79.43000030517578,157.67999267578125 C81.66999816894531,162.8800048828125 83.47000122070312,168.22000122070312 84.8499984741211,173.6999969482422 C85.30000305175781,175.49000549316406 86.91000366210938,176.75 88.75,176.75 C90.5999984741211,176.75 92.19999694824219,175.49000549316406 92.6500015258789,173.6999969482422 C94.02999877929688,168.22000122070312 95.83000183105469,162.88999938964844 98.06999969482422,157.67999267578125 C103.91000366210938,144.1199951171875 111.91000366210938,132.25999450683594 122.08000183105469,122.08000183105469 C132.25,111.91000366210938 144.1199951171875,103.9000015258789 157.67999267578125,98.06999969482422 C162.8800048828125,95.83000183105469 168.22000122070312,94.02999877929688 173.6999969482422,92.6500015258789 C175.49000549316406,92.19999694824219 176.75,90.58999633789062 176.75,88.75 C176.75,86.9000015258789 175.49000549316406,85.30000305175781 173.6999969482422,84.8499984741211 C168.22000122070312,83.47000122070312 162.88999938964844,81.66999816894531 157.67999267578125,79.43000030517578 C144.1199951171875,73.58999633789062 132.25999450683594,65.58999633789062 122.08000183105469,55.41999816894531 C111.91000366210938,45.25 103.9000015258789,33.380001068115234 98.06999969482422,19.81999969482422 C95.83000183105469,14.619999885559082 94.02999877929688,9.279999732971191 92.6500015258789,3.799999952316284 C92.19999694824219,2.009999990463257 90.5999984741211,0.75 88.75,0.75 C86.9000015258789,0.75 85.30000305175781,2.009999990463257 84.8499984741211,3.799999952316284"
                                            fill-opacity="1"></path>
                                        <linearGradient id="__lottie_element_1387" spreadMethod="pad"
                                            gradientUnits="userSpaceOnUse" x1="-33" y1="26" x2="31" y2="-28">
                                            <stop offset="0%" stop-color="rgb(52,107,241)"></stop>
                                            <stop offset="22%" stop-color="rgb(50,121,248)"></stop>
                                            <stop offset="45%" stop-color="rgb(49,134,255)"></stop>
                                            <stop offset="72%" stop-color="rgb(64,147,255)"></stop>
                                            <stop offset="99%" stop-color="rgb(79,160,255)"></stop>
                                        </linearGradient>
                                        <linearGradient id="__lottie_element_1391" spreadMethod="pad"
                                            gradientUnits="userSpaceOnUse" x1="-33" y1="26" x2="31" y2="-28">
                                            <stop offset="0%" stop-color="rgb(52,107,241)"></stop>
                                            <stop offset="22%" stop-color="rgb(50,121,248)"></stop>
                                            <stop offset="45%" stop-color="rgb(49,134,255)"></stop>
                                            <stop offset="72%" stop-color="rgb(64,147,255)"></stop>
                                            <stop offset="99%" stop-color="rgb(79,160,255)"></stop>
                                        </linearGradient>
                                        <mask id="__lottie_element_1384_1" mask-type="alpha">
                                            <use xlink:href="#__lottie_element_1384"></use>
                                        </mask>
                                    </defs>
                                    <g clip-path="url(#__lottie_element_1377)">
                                        <g mask="url(#__lottie_element_1384_1)" style="display: block;">
                                            <g transform="matrix(0.12479999661445618,0,0,0.12479999661445618,4.986400604248047,4.986400604248047)"
                                                opacity="1">
                                                <g opacity="1" transform="matrix(1,0,0,1,88.25,88.25)">
                                                    <path fill="url(#__lottie_element_1391)" fill-opacity="1"
                                                        d=" M-14.654000282287598,174.77099609375 C-14.654000282287598,174.77099609375 174.77099609375,14.654000282287598 174.77099609375,14.654000282287598 C174.77099609375,14.654000282287598 14.654000282287598,-174.77099609375 14.654000282287598,-174.77099609375 C14.654000282287598,-174.77099609375 -174.77099609375,-14.654000282287598 -174.77099609375,-14.654000282287598 C-174.77099609375,-14.654000282287598 -14.654000282287598,174.77099609375 -14.654000282287598,174.77099609375z">
                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>`;
    const optionsDiv = document.createElement('div');
    optionsDiv.id = 'options';
    optionsDiv.className = " pl-4 flex items-center h-[52px] select-none opacity-0";
    optionsDiv.innerHTML = `
                                <div class="w-8 h-[48px] flex items-center">
                                    <span class="material-symbols-rounded hover:bg-bg-grey p-1.5 rounded-[50%] cursor-pointer" style="font-size: 18px !important;"
                                    onclick="this.classList.add('bg-bg-rich-navy'); this.classList.remove('hover:bg-bg-grey'); this.classList.add('text-text-white');">
                                        thumb_up
                                    </span>
                                </div>
                                <div class="w-8 h-[48px] flex items-center justify-center">
                                    <span class="material-symbols-rounded hover:bg-bg-grey p-1.5 rounded-[50%] cursor-pointer" style="font-size: 18px !important;"
                                    onclick="this.classList.add('bg-bg-rich-navy'); this.classList.remove('hover:bg-bg-grey'); this.classList.add('text-text-white');">
                                        thumb_down
                                    </span>
                                </div>
                                <div class="w-8 h-[48px] flex items-center justify-center">
                                    <span class="material-symbols-rounded hover:bg-bg-grey p-1.5 rounded-[50%] cursor-pointer" style="font-size: 18px !important;"
                                    onclick="navigator.share({title: 'TasteAi', text: document.getElementById('${usertext + rand}').textContent, url: window.location.href}).catch(err => console.error('Error sharing:', err))">
                                        share
                                    </span>
                                </div>
                                <div class="w-8 h-[48px] flex items-center justify-center">
                                    <span class="material-symbols-rounded hover:bg-bg-grey p-1.5 rounded-[50%] cursor-pointer" style="font-size: 18px !important;" onclick="navigator.clipboard.writeText(document.getElementById('${usertext + rand}').textContent)">
                                        content_copy
                                    </span>
                                </div>
                            `;
    botBubble.insertAdjacentHTML('beforeend', icon);
    botBubble.appendChild(cursor);
    botBubble.appendChild(optionsDiv);
    chatbox.appendChild(botBubble);
    chatbox.scrollTop = chatbox.scrollHeight;

    const renderer = smd.default_renderer(cursor);
    const parser = smd.parser(renderer);


    const response = await fetch('chat.php', {
        method: "POST",
        headers: { 'Content-type': 'application/x-www-form-urlencoded', 'X-Bearer-Token': 'Ansh by Slew' },
        body: new URLSearchParams({ prompt: usertext, chat_history: JSON.stringify(messages.slice(-10)) }),
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


    smd.parser_end(parser)
    // const optionss = document.getElementById('options');
    optionsDiv.classList.remove('opacity-0');
    optionsDiv.classList.add('opacity-100');
    messages.push({
        role: 'assistant',
        content: document.getElementById(`${usertext + rand}`).textContent
    });
    localStorage.setItem('chat_messages', JSON.stringify(messages));

});
