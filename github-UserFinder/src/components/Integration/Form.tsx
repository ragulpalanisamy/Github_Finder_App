import axios from 'axios';
import React from 'react'
import { Row, Col, FormGroup, Label, Input, Button, Form } from 'reactstrap'

export default function FormInfo() {
    const [formData, setFormData] = React.useState({
        email: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    });

    // const clientSecret = '2c9d5b1af6bc7375dfaa17b48241d483';
    // const clientId = '6343152650855.6360149370148'
    // const AppId = 'A06AL4DAW4C';
    // const SigningSecret = '1325bf9bc1b330ad317451b6a19d50e8';
    // const verificationToken = '';
    // // const channelId = 'C06AL49G5QU';
    const onSlackSubmit = async (formData: any) => {
        try {
            const response = await axios.post('/sendToSlack', { formData });
            console.log('Message posted to Slack:', response.data);
        } catch (error) {
            console.log('Error posting message to Slack:', error);
        }
    };
    
  return (
    <div>
        <Form>
            <Row>
                <Col md={6}>
                <FormGroup>
                    <Label for="exampleEmail">
                    Email
                    </Label>
                    <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="exampleAddress">
                Address
                </Label>
                <Input
                id="exampleAddress"
                name="address"
                placeholder="1234 Main St"
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleAddress2">
                Address 2
                </Label>
                <Input
                id="exampleAddress2"
                name="address2"
                placeholder="Apartment, studio, or floor"
                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                />
            </FormGroup>
            <Row>
                <Col md={6}>
                <FormGroup>
                    <Label for="exampleCity">
                    City
                    </Label>
                    <Input
                    id="exampleCity"
                    name="city"
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                </FormGroup>
                </Col>
                <Col md={4}>
                <FormGroup>
                    <Label for="exampleState">
                    State
                    </Label>
                    <Input
                    id="exampleState"
                    name="state"
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                </FormGroup>
                </Col>
                <Col md={2}>
                <FormGroup>
                    <Label for="exampleZip">
                    Zip
                    </Label>
                    <Input
                    id="exampleZip"
                    name="zip"
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    />
                </FormGroup>
                </Col>
            </Row>
            <FormGroup check>
                <Input
                id="exampleCheck"
                name="check"
                type="checkbox"
                />
                <Label
                check
                for="exampleCheck"
                >
                Check me out
                </Label>
            </FormGroup>
            <Button color="primary" onClick={() => onSlackSubmit(formData)}>
                Submit
            </Button>
        </Form>
    </div>
  )
}
