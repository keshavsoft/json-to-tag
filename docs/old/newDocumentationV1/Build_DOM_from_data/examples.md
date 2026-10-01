# Examples

## Button

```javascript
const spec = {
  tagName: "button",
  classList: "btn btn-primary",
  textContent: "Save"
};

document.body.appendChild(buildSpecElement({ inSpec: spec }));
```

## Card

```javascript
const cardSpec = {
  tagName: "div",
  classList: "card p-4 shadow-sm",
  children: [
    {
      tagName: "h3",
      textContent: "User Profile"
    },
    {
      tagName: "p",
      textContent: "Manage your account details."
    },
    {
      tagName: "button",
      classList: "btn btn-outline-primary",
      textContent: "Edit"
    }
  ]
};
```

## Form

```javascript
const formSpec = {
  tagName: "form",
  children: [
    {
      tagName: "input",
      attributes: {
        type: "email",
        name: "email",
        placeholder: "Email",
        required: true
      }
    },
    {
      tagName: "button",
      textContent: "Submit",
      attributes: {
        type: "submit"
      }
    }
  ]
};
```

## Data-driven table idea

Because the specification is ordinary JavaScript data, repeated UI can be generated with `.map()`:

```javascript
const rows = users.map(user => ({
  tagName: "tr",
  children: [
    { tagName: "td", textContent: user.id },
    { tagName: "td", textContent: user.name },
    { tagName: "td", textContent: user.role }
  ]
}));
```

Then place those rows inside a `tbody` specification.

## The pattern

The important pattern is not a particular component. It is the composition model:

**data → specification → builder → native DOM**
