import "./styles.css";

const bodyElement = document.querySelector("body");

const button = document.createElement("div");
button.setAttribute("class", "btn");
button.innerHTML = `
<button>
  push
</button>
`;
let widgetIndex = 0;
let position = 0;
const lastingTime = 10000;
const animationTime = 300;

bodyElement.appendChild(button);
const widgetContainer = document.createElement("div");
widgetContainer.setAttribute("class", "widget-container");
bodyElement.appendChild(widgetContainer);

// const widgetRef = document.querySelector('.widget-container')

button.addEventListener("click", () => {
  const widget = document.createElement("div");
  const widgetId = widgetIndex;
  widgetIndex += 1;
  widget.setAttribute("class", "widget");
  widget.setAttribute("widgetIndex", widgetId);

  let timeoutIds = [];
  widget.innerHTML = `
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
`;

  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "remove-button");
  removeBtn.innerHTML = "x";
  removeBtn.addEventListener("click", () => {
    const ids = JSON.parse(widget.getAttribute("dataTimeoutIds"));
    ids.forEach(clearTimeout);
    position -= 1;
    widget.setAttribute("class", "widget removed");
    setTimeout(() => {
      widget.remove();
      document.querySelector(".widget-container").childNodes.forEach((ele) => {
        if (ele.getAttribute("widgetIndex") > widgetId)
          ele.style.top = `${parseInt(ele.style.top, 10) - 150}px`;
      });
    }, animationTime);
  });
  widget.appendChild(removeBtn);

  widget.style = `top: ${150 + 150 * position}px;`;
  document.querySelector(".widget-container").appendChild(widget);
  position += 1;
  timeoutIds.push(
    setTimeout(() => {
      widget.setAttribute("class", "widget removed");
    }, lastingTime - animationTime)
  );
  timeoutIds.push(
    setTimeout(() => {
      position -= 1;
      widget.remove();
      document.querySelector(".widget-container").childNodes.forEach((ele) => {
        ele.style.top = `${parseInt(ele.style.top, 10) - 150}px`;
      });
    }, lastingTime)
  );
  widget.setAttribute("dataTimeoutIds", JSON.stringify(timeoutIds));
});
