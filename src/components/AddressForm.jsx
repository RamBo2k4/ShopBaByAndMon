import React, { useState } from 'react';

const AddressForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Họ và tên"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Số điện thoại"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Địa chỉ cụ thể"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="Thành phố"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <div className="form-actions">
        <button type="submit" className="btn-save">Lưu</button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Hủy</button>
      </div>
    </form>
  );
};

export default AddressForm;