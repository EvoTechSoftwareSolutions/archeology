import { FiPhone } from 'react-icons/fi';

interface ContactItem {
  label: string;
  value: string;
}

interface EmergencyContactsCardProps {
  title?: string;
  contacts: ContactItem[];
}

const EmergencyContactsCard = ({
  title = 'Emergency contacts',
  contacts,
}: EmergencyContactsCardProps) => {
  return (
    <div className="bg-white border border-[#E7E6E2] shadow-[0_20px_50px_rgba(15,23,42,0.08)] rounded-[28px] p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 text-[#1f2937] font-semibold text-[0.95rem]">
          <FiPhone className="text-[#C66846]" size={20} />
          <span>{title}</span>
        </div>
        <div className="text-[#6b7280] text-[0.85rem]">Available 24/7</div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {contacts.map((contact) => (
          <div
            key={`${contact.label}-${contact.value}`}
            className="rounded-full bg-[#F8F6F1] border border-[#E2DED5] px-2 py-1 text-[0.68rem] font-semibold text-[#1f2937] shadow-sm"
          >
            {contact.label}
            <span className="ml-1 font-bold text-[#1f2937]">{contact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContactsCard;
