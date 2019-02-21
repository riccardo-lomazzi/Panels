# Panels

I've found the @crysfel [original tutorial](https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/) on building a custom expandable panel quite interesting, so I've decided to bring a personal flavor. Here's a list of changes I made:
- The folder and files structure has been redone to reflect the standard, most recent one (no more ```index.android.js``` or ```index.ios.js```)
- Changed the initial ```expanded``` state from ```true``` to ```false```.
- Since the onLayout method is triggered one frame after the render, what happens is that when the component renders, the panel is **expanded and then quickly collapsed**. I've decided the hide the entire UI of the component until it is actually loaded and the onLayout is completed, with a state variable (```layoutLoaded```). When the ```_setMinHeight``` and ```_setMaxHeight``` are triggered, they set this variable to ```true```. This actually reduces the timespan of expanding and collapsing, but doesn't totally hide it (it's just less noticeable). I hope someone can provide suggestions on this.
- Added a bit of styling to the panel, you can now insert the following props:
  - ```titleButton```: ```false```  show the ```title``` as a ```Text``` or ```true``` to show it as a ```Button``` with an ```Icon``` (MaterialIcons) on its keft side (provided you've installed and linked ```react-native-vector-icons```)
  - ```expandedIcon, collapsedIcon```: if not provided, the standard ```arrow-up```, ```arrow-down``` icons will be shown
  - above components can have their ```titleStyle```, ```titleButtonStyle```, ```iconStyle```, ```buttonIconStyle```

I've tried it with standard ```Picker``` and ```Text``` components of React Native and they seem to correctly flex inside the panel (on Android). 
If you have suggestions, feel free to open issues or pull requests!
