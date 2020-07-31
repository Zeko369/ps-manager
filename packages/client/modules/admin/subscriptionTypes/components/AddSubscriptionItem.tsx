import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  Box,
  Heading,
  Input,
  List,
  ListItem,
  IconButton,
  FormLabel,
  Stack,
  Flex
} from '@chakra-ui/core';
import { useProductsQuery, useCreateSubscriptionItemMutation } from '../../../../generated';
import { SUBSCRIPTION_TYPES } from '../graphql/queries';

interface IAddSubscriptionItemProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionTypeId: number;
}

const AddSubscriptionItem: React.FC<IAddSubscriptionItemProps> = ({
  onClose,
  isOpen,
  subscriptionTypeId
}) => {
  const [name, setName] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [added, setAdded] = useState<number[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [amounts, setAmounts] = useState<Record<number, number>>({});

  const { loading, error, data } = useProductsQuery();
  const [createSubscriptionItem] = useCreateSubscriptionItemMutation({
    refetchQueries: [{ query: SUBSCRIPTION_TYPES }]
  });

  const add = (productId: number) => () => {
    if (!added.includes(productId)) {
      if (
        added.length === 0 ||
        data.products.find((p) => p.id === added[added.length - 1]).name === name
      ) {
        setName(data.products.find((p) => p.id === productId).name);
      }

      setAdded((x) => [...x, productId]);
      setAmounts((x) => ({ ...x, [productId]: 1 }));
    }
  };

  const remove = (productId: number) => () => {
    if (added.length === 2) {
      setName(data.products.find((p) => p.id === added.find((a) => a !== productId)).name);
    } else if (added.length === 1 && data.products.find((p) => p.id === added[0]).name === name) {
      setName('');
    } else if (data.products.find((p) => p.id === productId).name === name) {
      setName(data.products.find((p) => p.id === added.filter((a) => a !== productId)[0]).name);
    }

    setAdded((x) => x.filter((p) => p !== productId));
  };

  const create = async () => {
    await createSubscriptionItem({
      variables: { amounts: added.map((id) => amounts[id]), productIds: added, subscriptionTypeId }
    });
    onClose();
  };

  const toggleProducts = () => setShowProducts((x) => !x);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <>
          <ModalHeader>Add new subscription item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  name="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </Box>

              {loading || !data ? (
                <Spinner />
              ) : error ? (
                <Box>
                  <Heading>Error....</Heading>
                  <code>{error.message}</code>
                </Box>
              ) : (
                <Box>
                  {showProducts && (
                    <Box>
                      <FormLabel htmlFor="search">Search</FormLabel>
                      <Input
                        name="search"
                        value={search}
                        placeholder="Search..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSearch(e.target.value)
                        }
                        mb={3}
                      />
                      <List styleType="disc">
                        {data.products
                          .filter((p) => search.split(' ').some((word) => p.name.includes(word)))
                          .filter((p) => !added.includes(p.id))
                          .map((product) => (
                            <ListItem>
                              <IconButton
                                size="xs"
                                variantColor="blue"
                                icon="add"
                                aria-label="Add"
                                mr={2}
                                my={1}
                                onClick={add(product.id)}
                              />
                              {product.name}
                            </ListItem>
                          ))}
                      </List>
                    </Box>
                  )}

                  <Stack mt={5}>
                    {added
                      .map((id) => data.products.find((p) => p.id === id))
                      .map((product) => (
                        <Box borderWidth="1px" p={3}>
                          <Flex justifyContent="space-between">
                            <Stack>
                              <Heading fontSize="1em">{product.name}</Heading>
                              <FormLabel htmlFor={`amount[${product.id}]`}>Amount</FormLabel>
                              <Input
                                type="number"
                                name={`amount[${product.id}]`}
                                value={amounts[product.id]}
                                onChange={(e) =>
                                  setAmounts({ ...amounts, [product.id]: parseInt(e.target.value) })
                                }
                              />
                            </Stack>
                            <IconButton
                              variantColor="red"
                              icon="delete"
                              aria-label="delete"
                              onClick={remove(product.id)}
                              mr={3}
                            />
                          </Flex>
                        </Box>
                      ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent="space-between" w="100%">
              <Stack isInline>
                <Button variantColor="cyan" onClick={toggleProducts}>
                  {showProducts ? 'Hide' : 'Show'} products
                </Button>
              </Stack>
              <Stack isInline>
                <Button variantColor="blue" onClick={onClose}>
                  Close
                </Button>
                <Button variantColor="green" onClick={create}>
                  Create
                </Button>
              </Stack>
            </Flex>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default AddSubscriptionItem;
