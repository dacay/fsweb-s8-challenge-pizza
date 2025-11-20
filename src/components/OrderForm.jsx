import { useState } from 'react';

import { Form, Row, Col, FormGroup, Label, Input, Button, InputGroup } from 'reactstrap';
import AdditionCheckBox from './AdditionCheckBox';

import './OrderForm.css';

export default function OrderForm() {

  const [formData, setFormData] = useState({
    name: '',
    size: '',
    thickness: '',
    notes: '',
    additions: [],
    quantity: 1,
  });

  const [cost, setCost] = useState({
    additions: 0,
    total: 0,
  });

  const handleIncrementQuantity = (e) => {
    setFormData({ ...formData, quantity: formData.quantity + 1 });
  };

  const handleDecrementQuantity = (e) => {
    setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) });
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    console.log(`${name}: ${value}`);

    if (e.target.name === 'additions') {

      setFormData({
        ...formData,
        [name]: formData.additions.includes(value) ? formData.additions.filter(a => a !== value) : [...formData.additions, value],
      })

    } else {

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className='order-form'>
      <div className="content">
        <h2>Position Absolute Acı Pizza</h2>
        <div className="metadata">
          <span className="price">85.50₺</span>
          <div className="reviews">
            <span>49</span>
            <span>(200)</span>
          </div>
        </div>
        <Form>
          <p className="description">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
          </p>
          <Row>
            <Col md={12}>
              <legend>
                Ad Soyad<span className="required">*</span>
              </legend>
              <Input
                name="name"
                type="text"
                onChange={handleChange}
                value={formData.name}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup tag="fieldset">
                <legend>
                  Boyut Seç<span className="required">*</span>
                </legend>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="size"
                      type="radio"
                      onChange={handleChange}
                      value="Küçük"
                      checked={formData.size === "Küçük"}
                    />
                    {' '}
                    Küçük
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="size"
                      type="radio"
                      onChange={handleChange}
                      value="Orta"
                      checked={formData.size === "Orta"}
                    />
                    {' '}
                    Orta
                  </Label>
                </FormGroup>
                <FormGroup
                  check
                >
                  <Label check>
                    <Input
                      name="size"
                      type="radio"
                      onChange={handleChange}
                      value="Büyük"
                      checked={formData.size === "Büyük"}
                    />
                    {' '}
                    Büyük
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup tag="fieldset">
                <legend>
                  Hamur Seç<span className="required">*</span>
                </legend>

                <Input
                  id="thickness"
                  name="thickness"
                  type="select"
                  onChange={handleChange}
                  value={formData.thickness}
                >
                  <option value="">
                    Hamur Kalınlığı
                  </option>
                  <option value="İnce">
                    İnce
                  </option>
                  <option value="Orta">
                    Orta
                  </option>
                  <option value="Kalın">
                    Kalın
                  </option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup tag="fieldset">
                <legend>
                  Ek Malzemeler
                </legend>
                <span className="description">En Fazla 10 malzeme seçebilirsiniz. 5₺</span>
              </FormGroup>
            </Col>
            <Col md={4}>
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Pepperoni" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Tavuk Izgara" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Mısır" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Sarımsak" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Ananas" />
            </Col>
            <Col md={4}>
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Sosis" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Soğan" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Sucuk" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Biber" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Kabak" />
            </Col>
            <Col md={4}>
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Kanada Jambonu" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Domates" />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Jalepeno" />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <legend>
                Sipariş Notu
              </legend>
              <Input
                name="notes"
                type="textarea"
                placeholder="Siparişine eklemek istediğin bir not var mı?"
                onChange={handleChange}
                value={formData.notes}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}><hr /></Col>
          </Row>
          <Row>
            <Col md={4}>
              <InputGroup>
                <Button style={{ backgroundColor: "#FDC913", border: "none", color: "black", width: "40px" }} onClick={handleDecrementQuantity}>
                  -
                </Button>
                <Input value={formData.quantity} type="text" style={{ textAlign: "center" }} />
                <Button style={{ backgroundColor: "#FDC913", border: "none", color: "black", width: "40px" }} onClick={handleIncrementQuantity}>
                  +
                </Button>
              </InputGroup>
            </Col>
            <Col md={8}>
              <div className="summary">
                <h3>Sipariş Toplamı</h3>
                <div className='summary-additions'>
                  <span>Seçimler</span>
                  <span>{cost.additions}₺</span>
                </div>
                <div className='summary-total'>
                  <span>Toplam</span>
                  <span>{cost.total}₺</span>
                </div>
              </div>
              <button className='order-button'>SİPARİŞ VER</button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}