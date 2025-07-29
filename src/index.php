<?php 
session_start();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$publicPaths = [
    '/index.php/ap/signin',
    '/index.php/ap/verify',
    '/index.php/ap/logout'
];


switch ($uri) {
    case '/index.php/ap/signin':
        $title = 'Sign In - TasteAi';
        break;
    case '/index.php/ap/verify':
        $title = 'Verify Account - TasteAi';
        break;
    case '/index.php/ap/logout':
        $title = 'Logging Out - TasteAi';
        break;
    case '/index.php/settings':
        $title = 'Settings - TasteAi';
        break;
    case '/index.php/activities':
        $title = 'Activities - TasteAi';
        break;
    default:
        $title = 'TasteAi';
        break;
}


// If user not logged in AND not on a public page → redirect
if (!isset($_SESSION['user']) && !in_array($uri, $publicPaths)) {
    header('Location: /index.php/ap/signin');
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php include './component/head.php'; echo $title = Head::render($title . ' | Powered by Slew'); ?>
</head>



<body class="h-screen ">
    <?php if(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) == '/index.php/ap/logout') : include './component/logout.php'; ?>
    <?php elseif(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) == '/index.php/ap/verify') : include './component/verify.php'; ?>
    <?php elseif($_SERVER['REQUEST_URI'] == '/index.php/ap/signin') : include './component/signin.php'; ?>
    <?php else: ?>
    <div class="flex-row flex items-center bg-bg-white-smoke min-h-screen w-full">
        <!-- sidebar  -->
        <div class="h-screen w-full max-w-[272px] max-sm:hidden flex flex-col justify-between pb-4 bg-bg-linen pt-4 pl-4 pr-4"
            id="sidebar">
            <div>
                <div class="flex items-center justify-between">
                    <span class="material-symbols-rounded p-2 rounded-[50%] hover:bg-bg-grey cursor-pointer"
                        style="font-size: 18px !important;">
                        menu
                    </span>
                    <span class="material-symbols-rounded p-2 rounded-[50%] hover:bg-bg-grey cursor-pointer"
                        style="font-size: 18px !important;">
                        search
                    </span>
                </div>
                <div class="mt-4">
                    <div class="flex transition-all duration-200 items-center gap-2 cursor-pointer text-text-charcoal hover:text-text-rich-navy hover:bg-bg-grey rounded-[24px] pl-1">
                        <span class="material-symbols-rounded p-2 rounded-[50%] ">
                            add
                        </span>
                        <span onclick="localStorage.setItem('chat_messages', JSON.stringify([]));location.href='/'"
                            class="text-[14px] ">New Chat</span>
                    </div>
                </div>
            </div>
            <div class="pb-8">
                <div class="flex flex-col gap-2">
                    <div class="transition-all duration-200 hover:text-text-rich-navy text-text-charcoal flex items-center gap-2 cursor-pointer hover:bg-bg-grey rounded-[24px] pl-1">
                        <span class="material-symbols-rounded p-2 rounded-[50%]">
                            history
                        </span>
                        <span onclick="location.href='/index.php/activities'"
                            class="text-[14px]">Activities</span>
                    </div>
                    <div class="transition-all duration-200 hover:text-text-rich-navy text-text-charcoal flex items-center gap-2 cursor-pointer hover:bg-bg-grey rounded-[24px] pl-1">
                        <span class="material-symbols-rounded p-2 rounded-[50%] ">
                            settings
                        </span>
                        <span onclick="location.href='/index.php/settings'"
                            class="text-[14px] ">Settings</span>
                    </div>
                </div>
            </div>
        </div>
        <?php if($_SERVER['REQUEST_URI'] == '/index.php/settings') : include './component/settings.php'; ?>
        <?php elseif($_SERVER['REQUEST_URI'] == '/index.php/activities') : include './component/activities.php'; ?>
        <?php else: ?>
        <!-- main content -->
        <div class="h-screen bg-bg-white-smoke w-full ">
            <div class="h-[36px] pt-1.5 pb-1.5  w-full mt-3 mb-3 flex justify-between items-center px-4">
                <div class="flex items-center justify-between gap-2">
                    <div class="block sm:hidden select-none"
                        onclick="document.querySelector('#sidebar').classList.toggle('max-sm:hidden');">
                        <span class="material-symbols-rounded p-2 rounded-[50%] hover:bg-bg-grey cursor-pointer"
                            style="font-size: 18px !important;">
                            menu
                        </span>
                    </div>
                    <h1 class="font-qurova font-[500] text-text-black text-2xl">TasteAi</h1>
                </div>
                <div>
                    <div>
                        <img src="<?php echo $_SESSION['user']['picture']; ?>" alt="profile_image"
                            class="rounded-[50%] h-8 w-8">
                    </div>
                </div>
            </div>
            <div class="max-w-[760px] w-full mx-auto flex-col flex justify-between h-[70vh]">
                <!-- message  -->
                <div id="message-container"
                    class="pt-4  flex flex-col gap-8 max-sm:px-4 max-sm:pb-5 h-full overflow-y-auto overflow-x-hidden">
                    <div id="chat" class="flex flex-col gap-2.5 list-disc ">
                        <div id="chat-wlc" class="flex items-center justify-center h-[70vh] pointer-events-none">
                            <h1 class="text-4xl tracking-tight font-medium text-text-rich-navy">Hello,
                                <?php echo $_SESSION['user']['name']; ?>
                            </h1>
                        </div>
                    </div>
                </div>

            </div>
            <div class="max-sm:px-4">
                <form id="chat-form">
                    <div class="border p-2 rounded-3xl border-border-grey border-solid max-w-[758px] w-full mx-auto">
                        <input type="text" id="prompt" placeholder="Ask TasteAi" autocomplete="off"
                            class="w-full outline-none text-lg placeholder:text-18 px-3 py-[9px]">
                        <!-- options  -->
                        <div class="flex items-center justify-between mt-2">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-rounded p-2 hover:bg-bg-grey rounded-[50%]">
                                    add
                                </span>
                                <div class="flex  items-center justify-center p-2 hover:bg-bg-grey rounded-xl">
                                    <span class="material-symbols-rounded">
                                        travel_explore
                                    </span>
                                    <span class="max-sm:hidden text-sm">Deep Research</span>
                                </div>
                                <span class="material-symbols-rounded p-2 rounded-[50%] hover:bg-bg-grey">
                                    more_horiz
                                </span>
                            </div>
                            <div>
                                <span id="subspan"
                                    class="material-symbols-rounded bg-bg-linen text-text-slate-grey p-2 rounded-[50%] hover:bg-bg-rich-navy hover:text-text-white">
                                    send
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <script type="module" src="/index.js"></script>
        

        <?php endif; ?>
    </div>
    <?php endif; ?>
</body>

</html>