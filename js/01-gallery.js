import { galleryItems } from "./gallery-items.js";

console.log(galleryItems);

const listEl = document.querySelector(".gallery");

function createGalleryItem(item) {
  const listItemEl = document.createElement("li");
  listItemEl.classList.add("gallery__item");
  listItemEl.innerHTML = `<a 
    class='gallery__link' 
    href='${item.original}'>
      <img 
        class='gallery__image' 
        src='${item.preview}' 
        data-source='${item.original}' 
        alt='${item.description}'
      />
    </a>`;
  return listItemEl;
}

function openImageInLightbox(event) {
  const clickedOn = event.target;

  if (clickedOn.nodeName !== "IMG") {
    return;
  }

  event.preventDefault();

  const instance = basicLightbox.create(
    `<img src='${clickedOn.dataset.source}'/>`,
    {
      onClose: () => {
        document.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  const onEscKeyPress = (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  };

  document.addEventListener("keydown", onEscKeyPress);

  instance.show();
}

galleryItems.forEach((item) => {
  const galleryItem = createGalleryItem(item);
  listEl.append(galleryItem);
});

listEl.addEventListener("click", openImageInLightbox);
