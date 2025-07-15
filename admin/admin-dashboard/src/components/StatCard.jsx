export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
      <p className="text-3xl font-semibold text-gray-800">{value}</p>
    </div>
  );
}
