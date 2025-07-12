"use client";
import styles from './OrganisasiPage.module.css';
import { useEffect, useState } from 'react';

export default function OrganisasiPage() {

    const[organisasi, setOrganisasi] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [ nama_organisasi, setNamaOrganisasi ] = useState('');
    const [ ketua_organisasi, setKetuaOrganisasi ] = useState('');
    const [ no_kontak, setNoKontak]= useState('');
    const [ tahun_dibentuk, setTahunDibentuk]= useState('');
    const [ pembina, setPembina]= useState('');
    const [ msg, setMsg ] = useState('');
    const [editId, setEditId] = useState(null);

  const fetchOrganisasi = async () => {
    const res = await fetch('api/organisasi');
    const data = await res.json();
    setOrganisasi(data);
  };

  useEffect(() => {
    fetchOrganisasi();
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/organisasi/${editId}` : '/api/organisasi';
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk, pembina }),
    });

    if (res.ok) {
        setMsg('Berhasil disimpan!');
        setNamaOrganisasi('');
        setKetuaOrganisasi('');
        setNoKontak('');
        setTahunDibentuk('');
        setPembina('');
        setEditId(null);
        setFormVisible(false);
        fetchOrganisasi();
    } else {
        setMsg('Gagal menyimpan data');
    }
};

const handleEdit = (item) => {
    setNamaOrganisasi(item.nama_organisasi);
    setKetuaOrganisasi(item.ketua_organisasi);
    setNoKontak(item.no_kontak);
    setTahunDibentuk(item.tahun_dibentuk);
    setPembina(item.pembina);
    setEditId(item.id);
    setFormVisible(true);
};



const handleDelete = async (id) => {
    if (!confirm('Yakin hapus data ini?')) return;

    await fetch(`/api/organisasi/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });

    fetchOrganisasi();
};

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Data Organisasi/Himpunan Mahasiswa</h1>
        <button
            className={styles.buttonToggle}
            onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Tutup Form' : 'Tambah Data'}
        </button>
        
        {formVisible && (
            <div className={styles.formWrapper}>
                <h3>Input Data Baru</h3>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <span>Nama Organisasi</span>
                    <input
                        type="text"
                        value={nama_organisasi}
                        onChange={(e) => setNamaOrganisasi(e.target.value)}
                        placeholder="Masukkan Nama Organisasi"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Ketua Organisasi</span>
                    <input
                        type="text"
                        value={ketua_organisasi}
                        onChange={(e) => setKetuaOrganisasi(e.target.value)}
                        placeholder="Masukkan Nama"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Nomor Kontak</span>
                    <input
                        type="number"
                        value={no_kontak}
                        onChange={(e) => setNoKontak(e.target.value)}
                        placeholder="Masukkan"
                        required
                        />
                </div>
                <div className={styles.formGroup}>
                    <span>Tahun Dibentuk</span>
                    <input
                        type="int"
                        value={tahun_dibentuk}
                        onChange={(e) => setTahunDibentuk(e.target.value)}
                        placeholder="Masukkan"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Pembina</span>
                    <input
                        type="text"
                        value={pembina}
                        onChange={(e) => setPembina(e.target.value)}
                        placeholder="Masukkan"
                        required
                    />
                </div>
                
            
                <button type="submit">
                    Simpan
                </button>
                <p>{msg}</p>
                </form>
            </div>
        )}

        <div className={styles.tableWrapper}>
            <table>
                <thead>
                <tr>
                    <th>Nama Organisasi</th>
                    <th>Ketua Organisasi</th>
                    <th>Nomor Kontak</th>
                    <th>Tahun Dibentuk</th>
                    <th>Pembina</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {organisasi.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.nama_organisasi}</td>
                            <td>{item.ketua_organisasi}</td>
                            <td>{item.no_kontak}</td>
                            <td>{item.tahun_dibentuk}</td>
                            <td>{item.pembina}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Hapus</button>
                            </td>
                            
                        </tr>
                    ))}
                    {organisasi.length === 0 && (
                        <tr>
                            <td colSpan="7">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    </div>
  );
}