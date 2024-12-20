

function handleKeyPress(event, times) {
    if (event.key === "Enter") {
        const inputElement = document.getElementById("userInput");
        const userInput = inputElement.value.trim();
        const terminalElement = document.getElementById("terminal");
        var askQuestion = document.getElementById("askquestion");

        // Append user input to terminal
        const userInputDiv = document.createElement("div");
        userInputDiv.innerHTML = "<span class='prompt'>$</span> " + userInput;
        terminalElement.removeChild(askQuestion);
        terminalElement.appendChild(userInputDiv);
        
        // Execute command
        if (times>0) {
            executeCommand2(userInput)
        } else {
            executeCommand(userInput);
        }

        // Clear input field
        inputElement.value = "";
                
        // Scroll to bottom of terminal
        terminalElement.scrollTop = terminalElement.scrollHeight;
    }
}

function finishUp(redo) {
        const terminalElement = document.getElementById("terminal");
        const askAgain = document.createElement("div")
        askAgain.setAttribute("id", "askquestion");
        if (redo==1) {
            askAgain.innerHTML = '<div id="askquestion">><input onFocus="this.select()" type="text" id="userInput" autocomplete="off" autofocus onkeypress="handleKeyPress(event, 0)"></div>';
        } else {
            askAgain.innerHTML = '<div id="askquestion">><input onFocus="this.select()" type="text" id="userInput" autocomplete="off" autofocus onkeypress="handleKeyPress(event, 1)"></div>';
        }
        
        terminalElement.appendChild(askAgain);
}

function loadingAssets(){

    const loading = "Opening folder. . . /. . . /. . . /. . .";
    var partByPart = loading.split("/");

    var i = 0;
    while (i < partByPart.length) {
        const commandOutput = document.createElement("div");
        commandOutput.className = "command-output";
        commandOutput.textContent = partByPart[i];
        setTimeout(function() {
            document.getElementById("terminal").appendChild(commandOutput);
        }, (i*2000));
        
        i += 1;
    }
    setTimeout(function() {
        displayHyperlinks();
        finishUp(0);
    }, (12001));
}

function displayHyperlinks() {
    const terminalElement = document.getElementById("terminal");
    const links = [
        ["Text", "evidence/text1.html"],
        ["Call Transcript", "evidence/voicetranscript.html"],
        ["Access Log", "evidence/accesslogs.html"],
        ["Comm Log", "evidence/commlog.html"], 
        ["Breaking News", "evidence/breakingnews.html"],
        ["Police Report", "evidence/policereport.html"],
        ["Fund Transfer", "evidence/fundtransfer.html"],
        ["Cerberus Prototype", "evidence/cerberus.html"],

]

    var i = 0;
    while (i < links.length) {
        const anchor = document.createElement("a");
        var linkText = document.createTextNode(links[i][0]);
        anchor.appendChild(linkText);
        anchor.href = links[i][1];
        anchor.target = "_blank";
        terminalElement.appendChild(anchor);
        linebreak = document.createElement("br");
        terminalElement.appendChild(linebreak);
        i += 1;
    }
    
}

function executeCommand(command) {
    const commandOutput = document.createElement("div");
    commandOutput.className = "command-output";
    switch(command.toLowerCase()) {
        case "y":
            loadingAssets()
            break;
        case "n":
            commandOutput.textContent = "Understood. Closing page...";
            document.getElementById("terminal").appendChild(commandOutput);
            setTimeout(function() {
                window.close()
            }, 5000);
            break;
        default:
            commandOutput.textContent = "Please type (y/n)";
            document.getElementById("terminal").appendChild(commandOutput);
            finishUp(1);
            break;
    }
}

function executeCommand2(command) {
    const terminalElement = document.getElementById("terminal");
    const commandOutput = document.createElement("div");
    commandOutput.className = "command-output";
    switch(command.toLowerCase()) {
        case "help":
            commandOutput.textContent = "List of commands:\n- open: reopens folder\n- close: closes window";
            document.getElementById("terminal").appendChild(commandOutput);
            finishUp(0);
            break;
        case "open":
            loadingAssets()
            document.getElementById("terminal").appendChild(commandOutput);
            break;
        case "close":
            commandOutput.textContent = "Understood. Closing page...";
            document.getElementById("terminal").appendChild(commandOutput);
            setTimeout(function() {
                window.close()
            }, 5000);
            document.getElementById("terminal").appendChild(commandOutput);
            break;
        case "entangled":
            const anchor = document.createElement("a");
            var linkText = document.createTextNode("44");
            anchor.appendChild(linkText);
            anchor.href = "evidence/num44.html";
            anchor.target = "_blank";
            terminalElement.appendChild(anchor);
            linebreak = document.createElement("br");
            terminalElement.appendChild(linebreak);
            document.getElementById("terminal").appendChild(commandOutput);
            finishUp(0);
            break;
        default:
            commandOutput.textContent = "Command not found. Type 'help' for a list of commands";
            document.getElementById("terminal").appendChild(commandOutput);
            finishUp(0);
            break;
    }
}