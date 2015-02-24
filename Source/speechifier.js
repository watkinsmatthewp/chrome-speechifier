chrome.extension.sendRequest({localstorage: "local"}, Run);

$.ajaxSetup ({  
	cache: true  
});

function Run(response)
{
	// alert('Will run');
	
	var D = document;
	var docLength = D.documentElement.innerHTML.length
	D.body.normalize();
	// var doTraverse = docLength <= 1000000;
	var doTraverse = true;

	if (doTraverse)
	{
		// alert('I will traverse the DOM');
		var allElements = document.getElementsByTagName('*');
		for (var i = 0; i < allElements.length; i++)
		{
			var thisElement = allElements[i];
			if (isSpeechifiableElement(thisElement) && !alreadyHasSpeechInput(thisElement))
			{
				// alert('Found a qualifying element');
				speechifyElement(thisElement);
			}
		}
	}
}

function speechifyElementAndDescendants(parentElement)
{
	if (isSpeechifiableElement(parentElement))
	{
		if (!alreadyHasSpeechInput(parentElement))
		{
			speechifyElement(parentElement);
		}
	}
	else if (element.hasChildNodes())
	{
		for (var i = 0; i < element.childNodes; i++)
		{
			speechifyElementAndDescendants(element.childNodes[i]);
		}
	}
}

function isSpeechifiableElement(element)
{
	if (element.nodeType != 1)
	{
		return false;
	}
	else if (element.tagName == "INPUT")
	{
		var inputType = element.getAttribute("type");
		return inputType == "text" || inputType == "search";
	}
	else
	{
		return false;
	}
}

function alreadyHasSpeechInput(element)
{
	return element.hasAttribute("x-webkit-speech")
}

function speechifyElement(element)
{
	// alert('Speechifying');
	element.setAttribute("x-webkit-speech","");
}