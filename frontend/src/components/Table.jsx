import { useState } from "react";
import DuplicateModal from "./DuplicateModal";

export default function Table({ data }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="font-semibold mb-4">Processed Data</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="border-b hover:bg-slate-50 cursor-pointer"
              onClick={() =>
                item.status === "Duplicate" && setSelected(item)
              }
            >
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>

              <td
                className={
                  item.status === "Clean"
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {item.status}
              </td>

              <td>{item.score}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* POPUP */}
      <DuplicateModal
        isOpen={selected !== null}
        data={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}