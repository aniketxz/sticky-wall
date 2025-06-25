function Modal({ showModal, saveNote, closeModal }) {
  return showModal ? (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-amber-50 w-full max-w-xl overflow-hidden shodow-lg rounded-lg p-4 border-[1px]">
        <form
          action={saveNote}
          className="flex flex-col gap-4 justify-self-auto"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border-none bg-amber-50 text-xl/loose text-gray-800 line-h focus:outline-none"
            required
          />
          <textarea
            type="text"
            name="notes"
            rows={10}
            placeholder="Write something..."
            className="text-sm text-gray-700 p-1 ml-2 focus:outline-none"
          />
          <section className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="border-[1px] px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-[1px] border-black px-4 py-2 rounded-md bg-black text-white hover:opacity-80 cursor-pointer"
            >
              Save
            </button>
          </section>
        </form>
      </div>
    </div>
  ) : null;
}

export default Modal;
