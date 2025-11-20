import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Form, Row, Col, FormGroup, Label, Input, Button, InputGroup, FormFeedback } from 'reactstrap';
import AdditionCheckBox from './AdditionCheckBox';

import './OrderForm.css';

const PIZZA_PRICE = 85.5;
const INITIAL_ERRORS = {
  name: '',
  additions: '',
  size: '',
  thickness: '',
};

export default function OrderForm({ onPlaceOrder }) {

  //#region Hooks
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    thickness: '',
    notes: '',
    additions: [],
    quantity: 1,
  });
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const [isValid, setIsValid] = useState(false);

  const [cost, setCost] = useState({
    additions: 0,
    total: 0,
  });

  const history = useHistory();

  //#endregion

  //#region Effects
  useEffect(() => {

    const baseCost = PIZZA_PRICE * formData.quantity;

    const additionsCost = (formData.additions.length * 5) * formData.quantity;

    const totalCost = baseCost + additionsCost;

    setCost({
      additions: additionsCost,
      total: totalCost,
    })

  }, [formData.additions, formData.quantity]);

  useEffect(() => {

    let newErrors = {}

    const { name, additions, size, thickness } = formData;

    if (name.trim().length < 3) {

      newErrors.name = 'Ad en az 3 karakter olmalıdır.';
    }

    if (additions.length < 4) {
      newErrors.additions = 'En az 4 malzeme seçmelisiniz.';
    } else if (additions.length > 10) {
      newErrors.additions = 'En fazla 10 malzeme seçebilirsiniz.';
    }

    if (size === '') {
      newErrors.size = 'Boyut seçmelisiniz.';
    }

    if (thickness === '') {
      newErrors.thickness = 'Hamur kalınlığı seçmelisiniz.';
    }

    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);
      setIsValid(false);

    } else {

      setErrors(INITIAL_ERRORS);
      setIsValid(true);
    }

  }, [formData.name, formData.additions, formData.size, formData.thickness]);

  //#endregion

  //#region Handlers
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

  const handleSubmit = (e) => {
    
    e.preventDefault();

    axios.post('https://reqres.in/api/pizza', formData, {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    })
    .then(resp => {

      console.log(resp.data);

      onPlaceOrder({
        ...resp.data,
        cost
      });

      setTimeout(() => {

        history.push('/success');

      }, 500);
    })
    .catch(err => {
      console.error(err);
    })
  }
  //#endregion

  //#region Render
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
        <Form onSubmit={handleSubmit}>
          <p className="description">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
          </p>
          <Row>
            <Col md={12}>
              <FormGroup tag="fieldset">
                <legend>
                  Ad Soyad<span className="required">*</span>
                </legend>
                <Input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={formData.name}
                  invalid={errors.name}
                />
                <FormFeedback>
                  {errors.name}
                </FormFeedback>
              </FormGroup>
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
                      invalid={errors.size}
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
                      invalid={errors.size}
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
                      invalid={errors.size}
                    />
                    {' '}
                    Büyük
                    <FormFeedback >
                      {errors.size}
                    </FormFeedback>
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
                  invalid={errors.thickness}
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
                <FormFeedback >
                  {errors.thickness}
                </FormFeedback>
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
                <Input type="checkbox" name="additions" invalid={errors.additions} hidden />
                <FormFeedback>
                  {errors.additions}
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Pepperoni" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Tavuk Izgara" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Mısır" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Sarımsak" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Ananas" invalid={errors.additions} />
            </Col>
            <Col md={4}>
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Sosis" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Soğan" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Sucuk" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Biber" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Kabak" invalid={errors.additions} />
            </Col>
            <Col md={4}>
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Kanada Jambonu" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Domates" invalid={errors.additions} />
              <AdditionCheckBox additions={formData.additions} onChange={handleChange} value="Jalepeno" invalid={errors.additions} />
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
              <button disabled={!isValid} className='order-button'>SİPARİŞ VER</button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
  //#endregion
}