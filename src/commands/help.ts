const helpObj = {
  "commands": [
    [
    "'about'",
    "Who made this website?",
    ],
    [
      "'projects'",
      "Maybe there's something interesting."
    ],
    [
      "'whoami'",
      "A perplexing question."
    ],
    ["'sudo'",
      "???"
    ],
    [
      "'repo'",
      "View the Github Repository."
    ],
    ["'banner'",
      "Display the banner."
    ],
    [
      "'clear'",
      "Clear the terminal."
    ]
  ],
}



const createHelp = () : string[] => {
  const help: string[] = [];
  help.push('<br>');

  helpObj.commands.forEach((ele) => {
    const SPACE = '&nbsp;';
    let string = '';
    string += SPACE.repeat(2);
    string += "<span class='command'>";
    string += ele[0];
    string += '</span>';
    string += SPACE.repeat(17 - ele[0].length);
    string += ele[1];
    help.push(string);
  });

  // Funzione per rilevare se il dispositivo è uno smartphone
  function isSmartphone(): boolean {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Aggiungi i messaggi di aiuto solo se non è uno smartphone
  if (!isSmartphone()) {
    help.push('<br>');
    help.push("Press <span class='keys'>[Tab]</span> for auto completion.");
    help.push("Press <span class='keys'>[Esc]</span> to clear the input line.");
    help.push("Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands.");
    
  }
  
  help.push('<br>');

  return help;
}

export const HELP = createHelp();
