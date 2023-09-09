/* eslint-disable @typescript-eslint/no-explicit-any */

const DesktopIcon = ({ imgSrc, label, onClick }: any) => (
    <div className="desktop-icon" onClick={onClick} style={{ width: 64, height: 64, textAlign: 'center', marginTop: 6, marginBottom: 20 }}>
        <img src={imgSrc} alt={label} style={{ width: 48, height: 48 }} />
        <p style={{ marginTop: -4, fontSize: 12 }}>{label}</p>
    </div>
);

export default DesktopIcon