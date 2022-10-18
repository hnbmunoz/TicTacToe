import * as Utility from "../../utilities/utility.js"

const Slider = (onSliderChange) => {
  let sliderContainer = Utility.CreateElement('div');
  sliderContainer.classList.add('slider-container')

  let sliderElement = Utility.CreateElement('label');
  sliderElement.setAttribute('name', 'sliderElement')
  sliderElement.style.width = '3.75rem';
  sliderElement.style.height = '2.13rem';
  sliderElement.style.display = 'inline-block';
  sliderElement.style.position = 'relative';

  let sliderSwitch = Utility.CreateElement('input');
  sliderSwitch.setAttribute('type', 'checkbox');
  sliderSwitch.setAttribute('name', 'sliderSwitch')
  sliderSwitch.style.opacity = "0";
  sliderSwitch.style.width = "0";
  sliderSwitch.style.height = "0";
  sliderSwitch.classList.add('switch')
  sliderSwitch.addEventListener('change', onSliderChange)

  let sliderDisplay = Utility.CreateElement('span');
  sliderDisplay.classList.add('slider');

  sliderElement.appendChild(sliderSwitch)
  sliderElement.appendChild(sliderDisplay)
  sliderContainer.appendChild(sliderElement)

  return sliderContainer
}

export default Slider