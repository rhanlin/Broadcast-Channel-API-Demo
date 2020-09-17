const bc = new BroadcastChannel('test_channel');

const app = document.querySelector('#app')
const btnList = document.querySelectorAll('.btn')
const triggerBtn = document.querySelector('#trigger')
let flag = false

// Handle incoming message
bc.addEventListener('message', e => {
  // console.log(e.data);
  const BroadcastChannelData = e.data
  app.style.background = `${BroadcastChannelData.backgroundColor}`
  flag = BroadcastChannelData.flag
})

triggerBtn.addEventListener('click', e => {
  flag = !flag
  if(flag) e.target.textContent = 'Close Broadcast Channel'
  else e.target.textContent = 'Open Broadcast Channel'
  
})

btnList.forEach(element => {
  element.addEventListener('click', e => {
    changeBackgroundColor(e.target)
  })
})

function changeBackgroundColor(target){
  const style = getComputedStyle(target)
  const backgroundColor = style.backgroundColor
  app.style.background = `${backgroundColor}`

  // Send messages 
  if(flag){
    bc.postMessage({
      backgroundColor: backgroundColor,
      flag: flag
    })
  }
}