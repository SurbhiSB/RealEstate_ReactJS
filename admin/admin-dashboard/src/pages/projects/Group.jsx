import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function Group() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <div className="text-xl font-semibold mb-4">Project Group</div>

          <div className="bg-white shadow-md rounded-md p-6 border-t-4 border-gray-700">
            <div className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-folder-plus"></i> {/* optional icon */}
              Project Group
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="groupName">Group Name</label>
                <input
                  id="groupName"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="shortName">Display/Short Name</label>
                <input
                  id="shortName"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
