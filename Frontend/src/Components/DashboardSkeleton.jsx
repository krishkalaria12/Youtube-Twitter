import Search from "./Search";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function DashboardSkeleton() {
    return (
        <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-800 p-4 rounded">
                <Logo />
                <div className="flex items-center">
                    <Search />
                    <Link to="#" className="ml-4 text-gray-300">Logout</Link>
                </div>
            </div>

            {/* Dashboard Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded shadow">
                        <div className="w-24 h-6 bg-gray-700 rounded animate-pulse"></div>
                        <div className="mt-2 w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>

            {/* Dashboard Video Table Skeleton */}
            <div className="mt-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-300">Videos</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Upload Video</button>
                </div>
                <div className="mt-4">
                    <table className="w-full table-auto bg-gray-800 text-gray-300 rounded">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Published</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index}>
                                    <td colSpan="5" className="bg-gray-900 p-4">
                                        <div className="w-full h-6 bg-gray-700 rounded animate-pulse"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}
