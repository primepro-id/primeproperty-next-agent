import { toast } from "react-toastify";

export const BOOKMARK_STORAGE_TAG = "bookmark_ids";
export const bookmarkProperty = (propertyId: number) => {
  const storedBookmarks = localStorage.getItem(BOOKMARK_STORAGE_TAG);
  if (storedBookmarks) {
    const bookmarkIds: number[] = JSON.parse(storedBookmarks);
    if (bookmarkIds.includes(propertyId)) {
      const index = bookmarkIds.indexOf(propertyId);
      bookmarkIds.splice(index, 1);
      localStorage.setItem(BOOKMARK_STORAGE_TAG, JSON.stringify(bookmarkIds));
      toast.success("Property removed from listings");
    } else {
      localStorage.setItem(
        BOOKMARK_STORAGE_TAG,
        JSON.stringify([...bookmarkIds, propertyId]),
      );
      toast.success("Property saved to listings");
    }
  } else {
    localStorage.setItem(BOOKMARK_STORAGE_TAG, JSON.stringify([propertyId]));
    toast.success("Property saved to listings");
  }
};

export const getBookmarkIds = (): number[] => {
  const storedBookmarks = localStorage.getItem(BOOKMARK_STORAGE_TAG);
  if (storedBookmarks) {
    return JSON.parse(storedBookmarks);
  }
  return [];
};
